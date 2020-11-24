import React, { useState } from "react";
import { Pagination } from "react-bootstrap";

export default ({ current, pageSize, previous, next, total, updatePage }) => {
  const [page, setPage] = useState(current);

  const goToPage = (number) => {
    setPage(number);
    updatePage(number);
  };

  let limit = 5;
  let active = page;
  const itemsFirstPrev = [
    <Pagination.First
      key={-1}
      disabled={page < limit}
      onClick={() => {
        active = 1;
        goToPage(1);
      }}
    />,
    <Pagination.Prev
      key={-2}
      disabled={page === 1}
      onClick={() => {
        goToPage(page - 1);
        active = page;
      }}
    />,
  ];

  const nextPage = () => {
    const items = setArray();
    items.shift();
    items.push(
      <Pagination.Item
        key={active}
        active={true}
        onClick={() => goToPage(active)}
      >
        {active}
      </Pagination.Item>
    );
    return items;
  };

  const itemsLastNext = [
    <Pagination.Next
      key={-3}
      disabled={page === total}
      onClick={() => {
        active = page + 1;
        if (active > limit) {
          nextPage();
        }
        goToPage(active);
      }}
    />,
    <Pagination.Last
      key={-4}
      disabled={page === total}
      onClick={() => {
        active = page + 1;
        goToPage(total);
      }}
    />,
  ];

  const getNumbers = () => {
    // calculate numbers to show as pages
    const first = page <= limit ? 1 : page - limit + 1;
    const last = page <= limit ? limit : page;
    const numbers = [];
    for (
      let number = first;
      number <= (total > last ? last : total);
      number++
    ) {
      numbers.push(number);
    }
    return numbers;
  };

  const setArray = () => {
    let items = [];
    const numbers = getNumbers();
    numbers.forEach((number) => {
      items.push(
        <Pagination.Item
          key={number}
          active={number === active}
          onClick={() => goToPage(number)}
        >
          {number}
        </Pagination.Item>
      );
    });
    return [itemsFirstPrev, items, itemsLastNext];
  };

  const paginationBasic = (
    <div>
      <Pagination>{setArray()}</Pagination>
      <br />
    </div>
  );

  return paginationBasic;
};
