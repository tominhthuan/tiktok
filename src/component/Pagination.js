import React, { Component } from 'react';

class Pagination extends Component {
    handleClick = (page) => {
        const { onPageChange } = this.props;
        onPageChange(page);
    };

    render() {
        const { currentPage, itemsPerPage, totalItems } = this.props;

        const totalPages = Math.ceil(totalItems / itemsPerPage);

        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(i);
        }

        return (
            <div>
                <ul className="pagination">
                    {pageNumbers.map((page) => (
                        <li
                            key={page}
                            className={currentPage === page ? 'active' : ''}
                            onClick={() => this.handleClick(page)}
                        >
                            {page}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default Pagination;