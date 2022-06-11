# Title: Make a Family (MAF)

# Description

Make a Family (MAF)):
Make a Family (MAF) is one of the software to help the people with disabilities and motivating the phyically challenged people.


# General Information

1.  MAF is used to help the physically Challenged people.

2.  MAF is used for awaiting physically challenged people who need the help, by gathering the information about the people who are interested to help and the details of doctor who are ready to care them.


# Project Flow

    Login---> - Family System(Home)
              - Who We Are(About)
              - Our Success
              - Doctor Registration----> -Add Doctor Details
                                         -View Doctor List Added by you
                                         -Doctor list in MAF
              - Patient Registration---->-Add Patient Details
                                         -View Patient List Added by you
                                         -Patient list in MAF
              - Volunteer Registration-->-Add Volunteer Details
                                         -View Volunteer List Added by you
                                         -Volunteer list in MAF
              - Donate
              - Contact
              - Logout

# How to use the project

1.  First you have to login to the MAF with your credendials like Aadhar Number and Password.

2.  If you are the new user then you have to register first.

3.  New User --> Fill all your details.If the Aadhar number is already used by another user then you have to use another Aadhar number

4.  After regitration please login.

5.  Login --> After successful registration it will navigate to home page.

6.  If you are a Doctor who interested to help please register. 

7.  Doctor Registration --> Add the details to couchdb.

8.  Doctor List Added By You --> List the details of Doctor entered by you in tabular format.

9.  Doctor list in MAF --> List the details of all Doctor in MAF in tabular format.

10. If you are a Volunteer who interested to help please register. 

11. Volunteer Registration --> Add the details to couchdb.

12. Volunteer List Added By You --> List the details of Volunteer entered by you in tabular format.

13. Volunteer list in MAF --> List the details of all Volunteer in MAF in tabular format.

14. If you are a Patient who need help please register. 

15. Patient Registration --> Add the details to couchdb.

16. Patient List Added By You --> List the details of Patient entered by you in tabular format.

17. Patient list in MAF --> List the details of all Patient in MAF in tabular format.

# Install and run it locally

1.  Download or clone the repository to your local machine:

    $ git clone https://github.com/sujathaselvaraj/miniProject

2.  Run npm install inside the downloaded/cloned folder:

    $ npm install

3.  Start the dev server by running the command below. Navigate to http://localhost:4200/.
    The app will automatically reload if you change any of the source files.

    $ npm test

# Features

1. Session Handling(login and logout) in angular level.
2. DB Connectivity.
3. DB Relational data Handling.
4. Exception Handling with try and catch.
5. Lookup relation.
6. One to many relation.
7. Displaying details using Mango Query
8. Form validation in Cloudant database level.
9. Form validation in frontend level.
10. Toastr for alert message.  


# Technology

# Frontend:

1. Angular-cli - 11.0.0
2. Bootstrap - 5.1.3
3. ngx-toastr -13.2.1

# Backend

1. NodeJs : 14.14.0

# NPM

command to install: npm install npm-package_name

1. body-parser : 1.20.0,
2. cors : 2.8.5,
3. express : 4.18.1,
4. helmet : 5.1.0,
5. nano : 10.0.0,

# Database

1. cloudant(couch DB)