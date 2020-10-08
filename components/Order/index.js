import React from "react";

const Order = () => {
  return (
    <div className="overflow-hidden shadow-lg border-t-4 bg-white mb-4 mx-1 rounded-b-lg rounded-t border-red-light w-full md:w-1/4">
      <div className="px-6 py-4 mb-2 mt-4 mb-8">
        <div className="uppercase tracking-wide text-c2 mb-2">Products</div>
        <div class="flex  border px-4 py-2 text-lg text-grey-darkest border-b-0">
          <div class="pl-2">First</div>
        </div>
        <div class="flex border px-4 py-2 text-lg text-grey-darkest border-b-0">
          <div class="pl-2">First</div>
        </div>
        <div class="flex border px-4 py-2 text-lg text-grey-darkest border-b-0">
          <div class="pl-2">First</div>
        </div>
        <div class="flex border px-4 py-2 text-lg text-grey-darkest ">
          <div class="pl-2">First</div>
        </div>
        <div className="mt-4 uppercase tracking-wide text-c2 mb-2">
          Client: <span className="capitalize text-grey-darkest">Carl</span>
        </div>
        <div className="mt-2 uppercase tracking-wide text-c2 ">Status:</div>
        <select className="mt-2 appearance-none bg-blue-600 border border-blue-600 text-white p-2 text-center rounded leading-tight focus:outline-none focus:bg-blue-600 focus:border-blue-500 uppercase text-xs font-bold ">
          <option value="complete">Complete</option>
          <option value="pending">Pending</option>
          <option value="canceled">Canceled</option>
        </select>
        <div className="mt-2 uppercase tracking-wide text-c2 ">Total:</div>
      </div>
    </div>
  );
};
export default Order;
