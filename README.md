# STAND-STressANxietyDetecion-Backend

Backend of MethAware Mobile Application -- NodeJS

Instructions:

- Clone the Repository
- Navigate to the root directory of the cloned repository
- Install Node.js Dependencies from scratch if you need to: npm install
- Download and install WAMP (Windows, Apache, MySQL, PHP) from the official website
- Import the SQL File included in the repository:
  -- Open a web browser and visit http://localhost/phpmyadmin.
  -- Log in to the PHPMyAdmin interface (the default username is "root," and there may not be a password by default).
  -- Create a new MySQL database for your project if one doesn't already exist.
  -- Select the newly created database in PHPMyAdmin.
  -- Click on the "Import" tab.
  -- Choose the banaware-uh.sql file from the cloned repository's directory.
  -- Click the "Go" button to import the SQL file into your database.
  -- Configure Database Connection:
- In the Node.js application, look for a configuration folder (config) that contains the database connection settings (db.js).
- Update the database configuration with the appropriate database name, username, and password. These credentials should match the MySQL settings on your local machine.
- In the command prompt or terminal, navigate to the Node.js application's root directory.
- Start the Node.js application by running the main JavaScript file using the following command:
  -- node index.js