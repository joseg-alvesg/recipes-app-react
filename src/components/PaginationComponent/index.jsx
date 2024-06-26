import PropTypes from 'prop-types';
import React from 'react';
import { Pagination } from 'react-bootstrap';

const MAX_RECIPES = 12;
const MAX_PAGES_SHOWN = 5;

export default function PaginationComponent({
  recipes = [],
  currentPage = 1,
  setCurrentPage,
}) {
  const totalPages = Math.ceil(recipes.length / MAX_RECIPES);

  const changePage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const createPaginationItems = () => {
    const items = [];
    items.push(
      <Pagination.Item
        key={ 1 }
        onClick={ () => changePage(1) }
        active={ currentPage === 1 }
      >
        1
      </Pagination.Item>,
    );

    if (totalPages > MAX_PAGES_SHOWN) {
      const startRange = Math.max(2, currentPage - 1);
      const endRange = Math.min(totalPages - 1, currentPage + 1);

      if (startRange > 2) {
        items.push(<Pagination.Ellipsis key="start-ellipsis" />);
      }

      for (let i = startRange; i <= endRange; i += 1) {
        items.push(
          <Pagination.Item
            key={ i }
            onClick={ () => changePage(i) }
            active={ currentPage === i }
          >
            {i}
          </Pagination.Item>,
        );
      }

      if (endRange < totalPages - 1) {
        items.push(<Pagination.Ellipsis key="end-ellipsis" />);
      }
    } else {
      for (let i = 2; i < totalPages; i += 1) {
        items.push(
          <Pagination.Item
            key={ i }
            onClick={ () => changePage(i) }
            active={ currentPage === i }
          >
            {i}
          </Pagination.Item>,
        );
      }
    }

    if (totalPages > 1) {
      items.push(
        <Pagination.Item
          key={ totalPages }
          onClick={ () => changePage(totalPages) }
          active={ currentPage === totalPages }
        >
          {totalPages}
        </Pagination.Item>,
      );
    }

    return items;
  };

  return (
    <Pagination className="pt-2 fw-bold m-0 mb-1">
      <Pagination.First
        onClick={ () => changePage(1) }
        disabled={ currentPage === 1 }
      />
      <Pagination.Prev
        onClick={ () => changePage(currentPage - 1) }
        disabled={ currentPage === 1 }
      />
      {createPaginationItems()}
      <Pagination.Next
        onClick={ () => changePage(currentPage + 1) }
        disabled={ currentPage >= totalPages }
      />
      <Pagination.Last
        onClick={ () => changePage(totalPages) }
        disabled={ currentPage >= totalPages }
      />
    </Pagination>
  );
}

PaginationComponent.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.shape({})),
  currentPage: PropTypes.number,
  setCurrentPage: PropTypes.func.isRequired,
};
