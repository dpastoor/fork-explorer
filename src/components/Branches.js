
import React from 'react';
import { render } from 'react-dom';
import qs from 'qs';
import xhr from 'xhr';
import Select from 'react-select';
import {RaisedButton} from 'material-ui';
import _ from 'lodash';
import AceEditor from 'react-ace';
import brace from 'brace';
import 'brace/mode/javascript';
import 'brace/theme/monokai';

export default class Branches extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            branches: "",
            file: "",
            currentBranch: "",
            toyProblems: [],
            currentToyProblem: ""

        }
    }
    _authenticate() {
        const code = this.props.location.query.code;
        xhr({
            url: 'https://fork-explorer-lh.herokuapp.com/authenticate/' + code,
            json: true
        }, (err, req, body) => {
            console.log('re-authentication successful');
            window.localStorage.token = body.token;
        });
    }
    componentWillMount() {
        if (!window.localStorage.token || window.localStorage.token === 'undefined') {
            this._authenticate()
        }
    }

    componentDidMount() {
        this.fetchToyProblems();
        this.fetchBranches();
    }

    fetchUserData(params) {
        xhr({
            url: 'https://api.github.com/user',
            json: true,
            headers: {
               Authorization: 'token ' + window.localStorage.token
            }
        }, (err, req, body) => {
            console.log('data fetching successful');
            console.log('req');
            console.log(req);
            console.log('body');
            console.log(body)
        });
    }

    fetchUserFile(selectedBranch) {
        selectedBranch =  selectedBranch || 'master';
        let toyProblem =  this.state.currentToyProblem !== "" ? this.state.currentToyProblem : 'primeTester';
        console.log(selectedBranch);
        xhr({
            url: 'https://api.github.com/repos/hackreactor/2015-11-toy-problems/contents/' + toyProblem + '/' + toyProblem + '.js?'+
            qs.stringify({
                ref: selectedBranch
            }),
            json: true,
            headers: {
                Authorization: 'token ' + window.localStorage.token
            }
        }, (err, req, body) => {
            console.log('data fetching successful');
            this.setState({
                file: window.atob(body.content)
            })
        });
    }

    fetchBranches (toyProblem) {
        xhr({
            url: 'https://api.github.com/repos/hackreactor/2015-11-toy-problems/branches?page=1&per_page=100',
            json: true,
            headers: {
                Authorization: 'token ' + window.localStorage.token
            }
        }, (err, req, body) => {
            let branches = body.map((x) => x.name);
            this.setState({
                branches: branches
            });
        });
    }

    fetchToyProblems () {
        xhr({
            url: 'https://api.github.com/repos/hackreactor/2015-11-toy-problems/contents/',
            json: true,
            headers: {
                Authorization: 'token ' + window.localStorage.token
            }
        }, (err, req, body) => {
            this.setState({
               toyProblems: _.pluck(_.filter(body, 'type', "dir"), 'name')
            });
        });
    }

    onSelectBranch (val) {
        this.setState({
            currentBranch: val
        });
        this.fetchUserFile(val);
    }

    onSelectToyProblem (val) {
        this.setState({
            currentToyProblem: val
        });
    }

    render() {
        let branchSelections = [{value: 'none', label: 'no branches'}];
        if (this.state.branches !== "") {
            branchSelections = _.map(this.state.branches, (d) => {
                return { value: d, label: d}
            })
        }

        let toyProblemSelections = [{value: 'none', label: 'no Toy Problems'}];
        if (this.state.toyProblems.length > 0) {
            toyProblemSelections = _.map(this.state.toyProblems, (d) => {
                return { value: d, label: d}
            })
        }
        return (
            <div>
                <h3>Pick a Toy Problem and User Branch</h3>
                <div className="section">
                    <Select name="some-toyProblems"
                            placeholder="pick a toy problem"
                            options={toyProblemSelections}
                            value={this.state.currentToyProblem}
                            onChange={this.onSelectToyProblem.bind(this)}/>
                    <Select name="some-branches"
                            placeholder="pick a branch"
                            options={branchSelections}
                            value={this.state.currentBranch}
                            onChange={this.onSelectBranch.bind(this) }/>
                </div>
                <AceEditor
                  mode="javascript"
                  theme="monokai"
                  name="ace"
                  height="50em"
                  width="100em"
                  value={this.state.file}
                  keyboardHandler="vim"
                />
            </div>
        )
    }
}
