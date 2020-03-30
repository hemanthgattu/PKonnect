import React, { Component } from 'react';
import background from '../Content/images/Communities_WelcomeScreen.png';
import '../styles/profile-page.css';

export class Home extends Component {
    static displayName = Home.name;
    constructor(props) {
        super(props)

        this.state = {
            Feedback: "",
            //AdditionalQuestions: "",
            chkSkillSearch: true,
            chkNetWorking: false,
            chkTraining: false,
            chkMentorship: false,
            chkKnowledge: false
        }

        //this.handleDropdownChange = this.handleDropdownChange.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        this.onCheckChange = this.onCheckChange.bind(this)
        this.changeHandler = this.changeHandler.bind(this)
    }

    //handleDropdownChange(e) {
    //    this.setState({ AdditionalQuestions: e.target.value });
    //}

     //<select id="dropdown" onChange={this.handleDropdownChange}>

    submitHandler = (e) => {
        e.preventDefault();
        this.postData();
    }

    async postData() {
        const userName = this.props.user.account.name;
        const email = this.props.user.account.name;
        const communityfeedback = {
            "UserName": userName,
            "Email": email,
            "Feedback": this.state.Feedback,
            //"AdditionalQuestions": this.props.AdditionalQuestions,
            "SkillSerach": this.state.chkSkillSearch,
            "NetWorking": this.state.chkNetWorking,
            "Training": this.state.chkTraining,
            "Mentorship": this.state.chkMentorship,
            "Knowledgebase": this.state.chkKnowledge
        };
        console.log(JSON.stringify(communityfeedback));

        const header = new Headers({
            "Content-Type": "application/json;charset=UTF-8",
            "Accept": "*/*"
        });

        const requestOptions = {
            method: 'POST',
            body: JSON.stringify(communityfeedback),
            headers: header            
        };

        //https://localhost:44324/api/ComminityFeedbacks
        await fetch("https://pkwebapi.azurewebsites.net/api/ComminityFeedbacks", requestOptions)
            .then(async response => {
                const data = await response.json();
                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    //const error = JSON.stringify(response)
                    return Promise.reject(error);
                }

                console.log("Created");
            })
            .catch(error => {
                this.setState({ errorMessage: error });
                console.error('There was an error!', error);
            });
    }

    changeHandler(e) {
        //this.setState({ value: e.target.value });
        this.setState({ Feedback: e.target.value });
    }

    onCheckChange(e) {
        this.setState({
            [e.target.name]: e.target.checked
        })
    }

    render() {
        //const { Feedback, SkillSerach, NetWorking, Training, Mentorship, Knowledge } = this.state;

        return (
            <div className="row">                
                <div className="leftPane">
                    <div className="homeImg">
                        <img className="homeImg" src={background} alt="Welcome" />
                    </div>
                    <div className="centered">
                        <div className="CenterLine1"> Community Building</div>
                        <div className="CenterLine2"> A new PK digital community is coming Summer 2020</div>
                    </div>
                </div>
                <div className="rightPane" align="left">
                    <div id="welcometitle">
                        <h5>
                            Hello, {this.props.user.account.name}
                        </h5>
                    </div>
                    <div >
                        <div >
                            <div className="bldComText">
                                Help us build your community
                                    </div>
                            <div className="hlpcomtxt">
                                Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
                                    </div>
                            <h3 className="shrideas">
                                Share your ideas
                                    </h3>
                            <div className="comtsText">Which of the following are important to you?</div>
                            <div>
                                <input type="checkbox" name="chkSkillSearch" checked={this.state.SkillSerach} onChange={this.onCheckChange} />
                                <label>SkillSerach</label>
                            </div>
                            <div>
                                <input type="checkbox" name="chkNetWorking" checked={this.state.NetWorking} onChange={this.onCheckChange} />
                                <label>NetWorking</label>
                            </div>
                            <div><input type="checkbox" name="chkTraining" checked={this.state.Training} onChange={this.onCheckChange} />
                                <label>Training</label>
                            </div>
                            <div>
                                <input type="checkbox" name="chkMentorship" checked={this.state.Mentorship} onChange={this.onCheckChange} />
                                <label>Mentorship</label>
                            </div>
                            <div>
                                <input type="checkbox" name="chkKnowledge" checked={this.state.Knowledge} onChange={this.onCheckChange} />
                                <label>Knowledge</label>
                            </div>
                            <br />
                            <div className="comtsText">Here is where another question?</div>
                            <select>                               
                                <option value="Empty"></option>
                                <option value="questions">few more questions</option>
                            </select>
                            <br />
                            <br />
                            <div className="comtsText">Comments/Questions?</div>
                            <textarea className="txtarea" id="comments" rows="5" name="comments"
                                cols="30" onChange={this.changeHandler} defaultValue="">                                
                            </textarea>
                            <br />
                            <br />
                            <button type="submit" onClick={this.submitHandler}>Submit</button>
                        </div>
                    </div>
                </div>                 
            </div>
        );
    }
}

export default Home;