/** @format */

import React from "react";
import { Pagination } from "react-bootstrap";

const Paginate = ({ pages, page, setPaginatePage }) => {
  return (
    pages > 1 && (
      <Pagination className='justify-content-center mt-5'>
        {[...Array(pages).keys()].map((x) => (
          <span
            onClick={() => setPaginatePage(x + 1)}
            key={x + 1}
            className='paginationItemStyle page-item'
            style={{ backgroundColor: "green !important" }}>
            <Pagination.Item active={x + 1 === page}>
              <span>{x + 1}</span>
            </Pagination.Item>
          </span>
        ))}
      </Pagination>
    )
  );
};

export default Paginate;
