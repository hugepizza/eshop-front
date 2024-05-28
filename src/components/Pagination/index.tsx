'use client';
import { Pagination as PaginationHeadless } from "react-headless-pagination";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  edgePageCount: number;
  middlePagesSiblingCount: number;
}
function Pagination(pros: PaginationProps) {
  return (
    <PaginationHeadless
      {...pros}
      setCurrentPage={() => {}}
      className="w-full h-12"
      truncableText="..."
      truncableClassName=""
    >
      <PaginationHeadless.PrevButton className="">
        Previous
      </PaginationHeadless.PrevButton>

      <nav className="flex justify-center flex-grow">
        <ul className="flex items-center">
          <PaginationHeadless.PageButton
            activeClassName=""
            inactiveClassName=""
            className=""
          />
        </ul>
      </nav>

      <PaginationHeadless.NextButton className="">
        Next
      </PaginationHeadless.NextButton>
    </PaginationHeadless>
  );
}

export default Pagination;
