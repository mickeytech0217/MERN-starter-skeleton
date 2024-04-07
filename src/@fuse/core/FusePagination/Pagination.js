import React from "react";

const Pagination = ({ pageCount, currentPage, handlePageChange }) => {
  const totalPages = pageCount;
  const current = currentPage + 1;

  return (
    <div className="flex justify-center mt-4" style={{ direction: "rtl", flexDirection: "row-reverse" }}>
      <button
        onClick={() => handlePageChange(0)}
        disabled={current === 1}
        className="px-3 py-2 mx-1 bg-white rounded-md"
      >
        {">>"}
      </button>
      <button
        onClick={() => handlePageChange(Math.max(currentPage - 1, 0))}
        disabled={current === 1}
        className="px-3 py-2 mx-1 bg-white rounded-md"
      >
        {">"}
      </button>
      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index}
          onClick={() => handlePageChange(index)}
          className={`px-3 py-2 mx-1 ${
            currentPage === index ? "bg-[#DCE7FF] w-24 h-24 text-[#3B49E7]" : "bg-white"
          } rounded-full`}
        >
          {convertToPersian(index + 1)}
        </button>
      ))}
      <button
        onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages - 1))}
        disabled={current === totalPages}
        className="px-3 py-2 mx-1 bg-white rounded-md"
      >
        {"<"}
      </button>
      <button
        onClick={() => handlePageChange(totalPages - 1)}
        disabled={current === totalPages}
        className="px-3 py-2 mx-1 bg-white rounded-md"
      >
        {"<<"}
      </button>
    </div>
  );
};

const convertToPersian = (number) => {
  const persianNumbers = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return number
    .toString()
    .split("")
    .map((digit) => persianNumbers[parseInt(digit)])
    .join("");
};

export default Pagination;
