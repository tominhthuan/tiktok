import React, { Component } from 'react';

class Footer extends Component {
    handleFilterChange = (filter) => {
        const { onFilterChange } = this.props;
        onFilterChange(filter);
    }

    render() {
        const { totalTodos, onClearCompleted } = this.props;

        return (
            <div className='footer'>
                <strong>
                    {totalTodos} <span>item left</span>
                </strong>
                <div className='button'>
                    <button onClick={() => this.handleFilterChange('all')}>All</button>
                    <button onClick={() => this.handleFilterChange('active')} >Active</button>
                    <button onClick={() => this.handleFilterChange('completed')} >Completed</button>
                </div>
                <button className="clear-button" onClick={onClearCompleted}>
                    Clear Completed
                </button>
            </div>
        );
    }
}

export default Footer;



