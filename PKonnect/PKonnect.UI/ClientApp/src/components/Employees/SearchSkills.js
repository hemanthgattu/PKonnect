import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import '../../styles/searchskills.css';


export class SearchSkills extends Component {



    render() {
        return (<div>
            <div className="SerachCriteria">

                <input type="text" name="name" id="txtSerachBySkills" value="Search by skill(s)" />

                <input type="text" name="name" id="txtSerachByName" value="Search by name" />

                <select id="availibility">
                    <option value="">Availibility</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                </select>


                <select id="role">
                    <option value="">Role</option>
                    <option value="SoftwareEngineer">SoftwareEngineer</option>
                    <option value="SoftwareEngineer2">SoftwareEngineer 2</option>
                    <option value="SoftwareEngineer3">SoftwareEngineer 3</option>
                    <option value="TeamLeader">Team Leader</option>
                </select>

                <select id="location">
                    <option value="">Location</option>
                    <option value="Omaha">Omaha</option>
                    <option value="Portland">Portland2</option>
                    <option value="Denver">Denver</option>
                </select>

                <button type="submit" id="filterresults" >Filter Results</button>
            </div>
        </div>);
    }
}
export default SearchSkills;