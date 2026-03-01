import pool from "../db/db.js"; //imported db to connect with postgres

export const getAllApplications = async (req, res) => {
  //defined the logic to get all applications from the db
  try {
    const result = await pool.query(`
      SELECT
        internships.id,
        company.company_name,
        company.location,
        internships.role,
        internships.status,
        internships.applied_date,
        internships.link
      FROM internships
      JOIN company
        ON internships.company_id = company.company_id
        WHERE internships.user_id = $1
      ORDER BY internships.applied_date DESC;
    `,[req.user.id]);

    res.status(200).json(result.rows); //response after executing query
  } catch (error) {
    console.error("DB ERROR:", error);
    res.status(500).json({message: "Failed to fetch applications"});
  }
};

export const getSingleApplication = async (req, res) => {
  const {id} = req.params;
  try {
    const result = await pool.query(
      `
      SELECT
        internships.id,
        company.company_name,
        company.location,
        internships.role,
        internships.status,
        internships.applied_date,
        internships.link
      FROM internships
      JOIN company
        ON internships.company_id = company.company_id
      WHERE internships.id = $1 AND internships.user_id=$2;
    `,
      [id, req.user.id],
    );

    res.status(200).json(result.rows[0]); //response after executing query
  } catch (error) {
    console.error("DB ERROR:", error);
    res.status(404).json({message: "Application not found"});
  }
};

export const createApplication = async (req, res) => {
  const {company_name, location, role, status, link} = req.body;
  try {
    //checking if a company already exists or not
    const checkCompany = await pool.query(
      `
      SELECT company_id FROM company WHERE company_name = $1`,
      [company_name],
    );
    //defining company id variable
    let companyId;

    //if company already exists adding to the company_id
    if (checkCompany.rows.length > 0) {
      companyId = checkCompany.rows[0].company_id;
    } else {
      //if not then creating new company
      const newCompany = await pool.query(
        `
        INSERT INTO company (company_name, location ) 
        VALUES($1, $2) 
        RETURNING company_id`,
        [company_name, location],
      );
      companyId = newCompany.rows[0].company_id;
    }
    //Insert new internship
    const newApplication = await pool.query(
      `
      INSERT INTO internships (role, status, link, company_id,user_id) 
      VALUES($1, $2, $3 , $4,$5) RETURNING *`,
      [role, status, link, companyId, req.user.id],
    );

    res.status(201).json(newApplication.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({message: "Failed to add application"});
  }
};

export const deleteApplication = async (req, res) => {
  const {id} = req.params;
  try {
    const result = await pool.query(
      `DELETE FROM internships WHERE id = $1 AND user_id = $2 RETURNING *`,
      [id, req.user.id],
    );

    if (result.rows === 0) {
      return res.status(404).json({message: "Application not found!"});
    }
    res
      .status(200)
      .json({message: "Deleted successfully!", data: result.rows[0]});
  } catch (error) {
    console.log(error);
    res.status(500).json({message: "Failed to delete the application"});
  }
};

export const updateApplication = async (req, res) => {
  const {id} = req.params;
  const {company_name, location, role, link} = req.body;

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // Update internship table
    const internshipResult = await client.query(
      `UPDATE internships
       SET role = $1, link = $2
       WHERE id = $3 AND user_id = $4
       RETURNING company_id`,
      [role, link, id, req.user.id],
    );

    if (internshipResult.rows.length === 0) {
      await client.query("ROLLBACK");
      return res.status(404).json({message: "Internship not found"});
    }

    const companyId = internshipResult.rows[0].company_id;

    // Update company table
    const companyResult = await client.query(
      `UPDATE company SET company_name = $1, location = $2 
       WHERE company_id = $3
       RETURNING *`,
      [company_name, location, companyId],
    );

    await client.query("COMMIT");

    res.json({
      message: "Updated successfully",
      company: companyResult.rows[0],
    });
  } catch (err) {
    await client.query("ROLLBACK");
    console.error(err);
    res.status(500).json({error: "Server error"});
  } finally {
    client.release();
  }
};

export const updateStatus = async (req, res) => {
  const {id} = req.params;
  const {status} = req.body;

  const normalizedStatus = status.toLowerCase();

  const validStatus = ["applied", "interview", "rejected", "offer"];

  if (!validStatus.includes(normalizedStatus)) {
    return res.status(400).json({message: "Invalid status value"});
  }

  try {
    const result = await pool.query(
      `UPDATE internships SET status= $1 WHERE id=$2 AND user_id = $3 RETURNING *`,
      [status, id,req.user.id],
    );

    if (result.rowCount === 0) {
      res.status(404).json({message: "No internship found with this id!"});
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({message: "Failed to update status!"});
  }
};
