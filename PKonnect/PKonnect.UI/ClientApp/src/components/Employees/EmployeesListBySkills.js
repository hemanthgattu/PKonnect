import React from 'react';
import '../../styles/EmployeesListBySkills.css';

import mail from '../../Content/images/mail.png';




function EmployeesListBySkills({ employee }) {
    return (
        <div className="employeeprofile">
            <div className="employeeinfo">
                This is {employee.FirstName} {employee.LastName}

                My EmailID {employee.Email}
            </div>
            <div className="locationframe">

                <div className="emailinvite">

                    <div className="mail">
                        <img src={mail} alt="Mail" />
                    </div>
                    <div className="invite">
                        Email Invite

                        </div>
                </div>
                denver,co

                </div>

        </div>
    )
}

export default EmployeesListBySkills
