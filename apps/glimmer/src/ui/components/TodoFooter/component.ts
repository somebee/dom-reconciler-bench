import Component from '@glimmer/component';

export default class TodoFooter extends Component {
    public remaining = 2;
    public todos = [];
    public removeCompleted() {
        console.log(arguments);
    }
}
