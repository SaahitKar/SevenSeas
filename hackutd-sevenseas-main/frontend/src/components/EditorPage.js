import { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { getUser, setUser, updateScript } from '../hook';
import '../css/editorpage.css';
export class ScriptOption extends Component {
    constructor() {
        super();
        this.state = {};
    }
    render() {

        return (
            <div className='script-option'>
                <div className='script-option-title'>{this.props.title}</div>
                <textarea id={this.props.id} className='script-option-field' spellCheck='false' defaultValue={this.props.field}></textarea>
            </div>
        );
    }
}
export default class EditorPage extends Component {
    constructor() {
        super();
        this.state = {};
    }
    render() {
        const data = this.props.location.state;
        if (!data || this.state.redirect) {
            return <Redirect to='/account' />;
        }
        return (
            <div id='editor-page'>
                <div id='editor-container'>
                    <div id='editor-header'>Algorithm Editor</div>
                    <div id='script-name'>Algorithm</div>
                    <textarea id='editor' className='text-field' defaultValue={data.code}></textarea>
                    <div id='script-description'>Description</div>
                    <textarea id='description' className='text-field' defaultValue={data.description}></textarea>
                    <div id='script-options-header'>Options</div>
                    <div id='script-options'>
                        <ScriptOption id='name' title='Name' field={data.name} />
                    </div>
                    <div id='editor-buttons'>
                        <div id='save-button' className='editor-button' onClick={() => this.saveScript() }>Run</div>
                        <div id='download-button' className='editor-button' onClick={() => this.downloadLog() }>Download</div>
                    </div>
                </div>
            </div>
        );
    }
    async saveScript() {
        const user = getUser();
        const oldName = this.props.location.state.name;
        const name = document.getElementById('name').value;
        const code = document.getElementById('editor').value;
        const description = document.getElementById('description').value;
        const username = getUser().username;
        let result = await updateScript(username, oldName, { name, description, code });
        result = result.data.result;
        if (result !== 0) {
            switch (result) {
                case -1:
                    break;
                default:
                    break;
            }
        }
        let scripts = user.scripts;
        let newScripts = [];
        scripts.forEach((key) => {
            if (key.name !== oldName) {
                newScripts.push(key);
            }
        });
        newScripts.push({
            name: name,
            description: description,
            code: code,
            log: ''
        });
        user.scripts = newScripts;
        setUser(user);
        this.setState({ redirect: '/account' });
    }
    downloadLog() {
        const element = document.createElement("a");
        const file = new Blob([this.props.location.state.log], {type: 'text/plain'});
        element.href = URL.createObjectURL(file);
        element.download = "log.txt";
        document.body.appendChild(element);
        element.click();
    }
}