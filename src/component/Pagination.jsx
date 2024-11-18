import React from 'react';

function Pagination({ page, pageSize, onPageChange, onPageSizeChange, totalCount }) {    
  // กำหนด default values ให้กับ totalCount และ pageSize หากเป็น undefined
  const validTotalCount = totalCount ?? 0; // ใช้ค่า 0 หาก totalCount ไม่ถูกต้อง
  const validPageSize = pageSize ?? 10; // ค่า default สำหรับ pageSize

  const totalPages = validTotalCount > 0 ? Math.ceil(validTotalCount / validPageSize) : 1; // คำนวณ totalPages

  const hasNextPage = page < totalPages;  // ถ้าหน้าปัจจุบัน < total หน้า, มี Next

  return (
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
      <button onClick={() => onPageChange(page - 1)} disabled={page <= 1}>
        Previous
      </button>
      <span>Page {page} of {totalPages}</span>
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={!hasNextPage}
      >
        Next
      </button>

      <label>Items per page:</label>
      <select onChange={onPageSizeChange} value={validPageSize}>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
      </select>
    </div>
  );
}

export default Pagination;
