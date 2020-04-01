import React from 'react';
import EmployeesListBySkills from './EmployeesListBySkills';
import SearchSkills from './SearchSkills';
import '../../styles/EmployeesListBySkills.css';


function Employees() {
    const Employees = [
        {
            Id: 1,
            FirstName: 'Datta',
            LastName: 'Gunturu',
            Email: 'gdattarajesh@PKGlobal.com'
        },
        {
            Id: 2,
            FirstName: 'Hemanth',
            LastName: 'Gattu',
            Email: 'Hemanth@PKGlobal.com'
        },
        {
            Id: 3,
            FirstName: 'Yatheen',
            LastName: 'Brahmadevera',
            Email: 'Yatheen@PKGlobal.com'
        }
    ]

    const employeeList = Employees.map(employee => <EmployeesListBySkills employee={employee} />)

    return <div>
        <div>
            <SearchSkills/>

        </div>

        <div>
            {employeeList}
        </div>
    </div>
}

export default Employees