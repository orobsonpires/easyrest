define([
    'base/js/namespace'
], (Jupyter) => {

    var exports = {};

    var validate = () => {

        let url = $('#url').val();

        if(url !== "" && url !== undefined) {
            initDataframe(url);
        }
    }

    var initDataframe = (url) => {

        $.getJSON(url, function (data) {
            IPython.notebook.kernel.execute("df='" + JSON.stringify(data) + "'")
        });
    }

    var show_dialog = () => {

        Jupyter.keyboard_manager.disable();

        let body = $('<div>');

        $("<div class='form-group'><label for='url'>Enter a valid rest URI:</label><input type='text' class='form-control' id='url'></div>").appendTo(body)

        Jupyter.dialog.modal({
            title: "Easy Rest Dataframe :)",
            body: body,
            buttons: {
                "Set (df) Variable": {
                    click: initDataframe
                }
            }
        })

        setTimeout(() => {
            $('.modal').on('hidden.bs.modal', () => {
                Jupyter.keyboard_manager.enable();
                console.log('Enable keyboard commands.')
            })
        }, 1000)
    };

    exports.load_ipython_extension = () => {

        let action = {
            icon: 'fa fa-smile-o',
            help: 'Create/update python variable(df) with the result of the rest URI set.',
            help_index: 'zz',
            handler: show_dialog
        };

        let prefix = 'easyrestext';
        let action_name = 'show-alert';

        let full_action_name = Jupyter.actions.register(action, action_name, prefix);
        Jupyter.toolbar.add_buttons_group([full_action_name]);

        //Jupyter.keyboard_manager.command_shortcuts.add_shortcut('s', show_dialog);
    };

    return exports;
});