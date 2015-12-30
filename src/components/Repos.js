
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
export default class Repos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            branches: "",
            file: "",
            currentBranch: ""
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
        console.log(selectedBranch);
        xhr({
            url: 'https://api.github.com/repos/hackreactor/2015-11-toy-problems/contents/primeTester/primeTester.js?'+
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

    fetchBranches (params) {
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

    onSelectBranch (val) {
        this.setState({
            currentBranch: val
        })
        this.fetchUserFile(val);
    }

    render() {
        let branchSelections = [{value: 'none', label: 'no branches'}];
        if (this.state.branches !== "") {
            branchSelections = _.map(this.state.branches, (d) => {
                return { value: d, label: d}
            })
        }
        return (
            <div>
                <RaisedButton label="fetch branches" onClick={this.fetchBranches.bind(this)}/>
                <div className="section">
                    <Select name="some-branches"
                            placeholder="pick a branch"
                            options={branchSelections}
                            onChange={this.onSelectBranch.bind(this) }/>
                </div>
                <div> Selected Branch: {this.state.currentBranch}</div>
                <AceEditor
                  mode="javascript"
                  theme="monokai"
                  name="ace"
                  height="50em"
                  width="100em"
                  value={this.state.file}
                />
            </div>
        )
    }
}
