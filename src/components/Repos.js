
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

    _fetchUserData(params) {
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

    _fetchUserFile(params) {
        let selectedBranch =  this.state.currentBranch === "" ? 'master' : this.state.currentBranch;
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
            //console.log('req');
            //console.log(req);
            //console.log('body');
            //console.log(body);
            //console.log(window.atob(body.content))
            console.log(body)
            this.setState({
                file: window.atob(body.content)
            })
        });
    }

    _fetchBranches (params) {
        xhr({
            url: 'https://api.github.com/repos/hackreactor/2015-11-toy-problems/branches?page=1&per_page=100',
            json: true,
            headers: {
                Authorization: 'token ' + window.localStorage.token
            }
        }, (err, req, body) => {
            console.log('data fetching successful');
            //console.log('req');
            //console.log(req);
            //console.log('body');
            //console.log(body);
            console.log(body)
            let branches = body.map((x) => x.name)
            this.setState({
                branches: branches
            });
        });
    }
    _onSelectBranch (val) {
        this.setState({
            currentBranch: val
        })
    }
    render() {
        let branchSelections = [{value: 'none', label: 'no branches'}]
        if (this.state.branches !== "") {
            branchSelections = _.map(this.state.branches, (d) => {
                return { value: d, label: d}
            })
        }
        return (
            <div>
                <h1> Welcome! </h1>
                <div> Selected Branch: {this.state.currentBranch}</div>
                <RaisedButton label="fetch user data" onClick={this._fetchUserData.bind(this)}/>
                <RaisedButton label="fetch file data" onClick={this._fetchUserFile.bind(this)}/>
                <RaisedButton label="fetch branches" onClick={this._fetchBranches.bind(this)}/>
                <div>
                    <Select name="some-branches"
                            placeholder="pick a branch"
                            options={branchSelections}
                            onChange={this._onSelectBranch.bind(this) }/>
                </div>
                <h1>code</h1>
                <pre><code className="language-javascript" >
    {`
function(test) {
  return result;
}
    `}
                </code></pre>
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
