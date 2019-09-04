import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField'

/**
 * Dialogs can be nested. This example opens a Date Picker from within a Dialog.
 */
export default class DialogExampleDialogDatePicker extends React.Component {
    state = {
        open: false,
        name:''
    };

    componentWillReceiveProps(nextProps) {
        this.setState({ search: nextProps.search });
    }

    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    handleSave = () =>{
        let searches
        localStorage.getItem('searches') ? searches = JSON.parse(localStorage.getItem('searches')) : searches = []
        searches.unshift(
            {
                name: this.state.name,
                params: this.state.search
            }
        )
        localStorage.setItem('searches', JSON.stringify(searches))
        this.handleClose()
    }

    handleNameChange = event => {
        this.setState({
          name: event.target.value
        });
      }

    render() {
        const actions = [
        <FlatButton
            label="Ok"
            primary={true}
            keyboardFocused={false}
            onClick={this.handleSave}
        />,
        ];

        return (
        <div>
            <RaisedButton label="Guardar" primary={true} onClick={this.handleOpen} style={{marginTop:5}}/>
            <Dialog
                title="Guradar busqueda"
                actions={actions}
                modal={false}
                open={this.state.open}
                onRequestClose={this.handleClose}
            >
                <TextField floatingLabelText="Save as" value={this.state.name} onChange={this.handleNameChange}/>
            </Dialog>
        </div>
        );
    }
}