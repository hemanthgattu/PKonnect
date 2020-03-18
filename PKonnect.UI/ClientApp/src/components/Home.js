import React, { Component } from 'react';
import background from '../Content/images/Communities_WelcomeScreen.png';
import '../styles/profile-page.css';

export class Home extends Component {
    static displayName = Home.name;
    render() {
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
                <div className="rightPane">
                    <div id="welcometitle">
                        <h5>
                            <h1>Hello, {this.props.user.account.name}</h1>
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
                                <input className="chkBox" type="checkbox" value="SkillSerach" />
                                        <label className="lbl">SkillSerach</label>
                                    </div>
                                    <div>
                                <input className="chkBox" type="checkbox" value="NetWorking" />
                                        <label className="lbl">NetWorking</label>
                                    </div>
                                    <div>
                                <input className="chkBox" type="checkbox" value="Training" />
                                        <label className="lbl">Training</label>
                                    </div>
                                    <div>
                                <input className="chkBox" type="checkbox" value="Mentorship" />
                                        <label className="lbl">Mentorship</label>
                                    </div>
                                    <div>
                                <input className="chkBox" type="checkbox" value="Knowledge" />
                                        <label className="lbl">Knowledge</label>
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
                            <textarea className="txtarea" id="comments" rows="5" cols="30">
                                    </textarea>
                                    <br />
                                    <br />
                                    <button>Submit</button>

                                </div>
                        </div>
                </div>
            </div>
        );
    }
}
