import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { APIAuthenticated } from "../../http";
import QRCode from "react-qr-code";
import toast from "react-hot-toast";
import s1 from '.././../assets/footer-bg-image1.jpg';

const OrderDetails = () => {
    // const apiUrl = import.meta.env.VITE_APP_API_URL;
  const { id } = useParams();
  const navigate = useNavigate();
  const { orders } = useSelector((state) => state.checkout);


     
     // intermediate problem solved start
  const [newOrder,setNewOrder] = useState([])
  const fetchOrderDetails = async()=>{
     const response = await APIAuthenticated.get("/order/") 
    if(response.status === 200){
      setNewOrder(response.data.data)
    }
  }

  useEffect(()=>{
    fetchOrderDetails()
  })

  const [filteredOrder] = orders ?  orders.filter((order) => order._id === id) : newOrder.filter((order) => order._id === id) // here we need only single selected order deteail so, order._id should be equal to selected order id from params . directly array desctructing beacuse it coming array
  // console.log("filteredorder",filteredOrder);

  
     // intermediate problem solved end

  // navigating to orders qr
  const adminOrderPageUrl = `http://localhost:3000/admin/orders/${id}`
  

  // cancel order
  const cancelOrder = async () => {
    try {
      const response = await APIAuthenticated.patch("/order/cancel/", { id });
      // console.log(response.data);
      if (response.status === 200) {
        toast.success("Order cancelled successfully")
        navigate("/myorders");
      }
    } catch (error) {
      console.log(error);
      toast.error("failed to cancel order")
    }
  };

  // cancel order
  const deleteOrder = async () => {
    try {
      const response = await APIAuthenticated.delete(`/order/${id}`);
      console.log(response.data);
      if (response.status === 200) {
        toast.success("Order deleted successfully")
        navigate("/myorders");
      }
    } catch (error) {
      console.log(error);
      toast.error("failed to delete order")
    }
  };

  return (
    <div className="container mx-auto max-w-2xl px-4  lg:max-w-7xl lg:px-8">
      <div className="py-22">
        <div className="flex justify-start item-start space-y-2 flex-col ">
          <h1 className="text-2xl dark:text-white lg:text-2xl leading-4  text-gray-800">
            {" "}
            <span className="font-semibold">Order</span> : {id}
          </h1>
          <p className="text-2xl dark:text-white lg:text-2xl   text-gray-800">
            {" "}
            <span className="font-semibold">Order CreatedAt </span> :{" "}
            {filteredOrder &&
              new Date(filteredOrder.createdAt).toLocaleString()}
          </p>
        </div>
        <div className="w-full h-[2px]  mt-2 "></div>
        <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
          <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
            <div className="flex flex-col justify-start items-start dark:bg-gray-800 bg-gray-200 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
              <p className="text-lg md:text-xl dark:text-white font-semibold leading-6 xl:leading-5 text-gray-800">
                My Order
              </p>
              {filteredOrder &&
                filteredOrder.items.length > 0 &&
                filteredOrder.items.map((item) => {
                  return (
                    <div
                      key={item._id}
                      className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full"
                    >
                      <div className="pb-4 md:pb-8 w-full md:w-35">
                        <img
                          className="w-full hidden md:block"
                          // src={item.product.productImage}
                            src={item.product?.productImage && item.product.productImage.length > 0 ? item.product.productImage[0] : s1}
                          alt="dress"
                        />
                      </div>
                      <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
                        <div className="w-full flex flex-col justify-start items-start space-y-8">
                          <h3 className="text-xl dark:text-white xl:text-2xl font-semibold leading-6 text-gray-800">
                            {item.product.productName}
                          </h3>
                        </div>
                        <div className="flex justify-between space-x-8 items-start w-full">
                          <p className="text-base dark:text-white xl:text-lg leading-6">
                            Rs: {item.product.productPrice}
                          </p>
                          <p className="text-base dark:text-white xl:text-lg leading-6 text-gray-800">
                            QTY : {item.quantity}
                          </p>
                          <p className="text-base dark:text-white xl:text-lg font-semibold leading-6 text-gray-800">
                            Total Rs:{" "}
                            {item.product.productPrice * item.quantity}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
            <div className="flex justify-center flex-col md:flex-row  items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
              <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-200 dark:bg-gray-800 space-y-6">
                <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">
                  Summary
                </h3>
                <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                  <div className="flex justify-between items-center w-full">
                    <p className="text-base dark:text-white leading-4 text-gray-800">
                      Payment Method
                    </p>
                    <p className="text-base dark:text-gray-300 leading-4 text-gray-600">
                      {filteredOrder?.paymentDetails.method}
                    </p>
                  </div>
                  <div className="flex justify-between items-center w-full">
                    <p className="text-base dark:text-white leading-4 text-gray-800">
                      Order Status
                    </p>
                    <p className="text-base dark:text-gray-300 leading-4 text-gray-600">
                      {filteredOrder?.orderStatus}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between items-center w-full">
                  <p className="text-base dark:text-white font-semibold leading-4 text-gray-800">
                    Total
                  </p>
                  <p className="text-base dark:text-gray-300 font-semibold leading-4 text-gray-600">
                    {filteredOrder?.totalAmount}
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-200 dark:bg-gray-800 space-y-6">
                <h3 className="text-xl dark:text-white font-semibold leading-5  text-gray-800">
                  Shipping
                </h3>
                <div className="flex justify-between items-start w-full">
                  <div className="flex justify-center items-center space-x-4">
                    <div className="w-8 h-8">
                      <img
                        className="w-full h-full"
                        alt="logo"
                        src="https://i.ibb.co/L8KSdNQ/image-3.png"
                      />
                    </div>
                    <div className="flex flex-col justify-start items-center">
                      <p className="text-lg leading-6 dark:text-white font-semibold text-gray-800">
                        {" "}
                        Delivery Charge
                        <br />
                        <span className="font-normal">
                          Delivery with 24 Hours
                        </span>
                      </p>
                    </div>
                  </div>
                  <p className="text-lg font-semibold leading-6 dark:text-white text-gray-800">
                    Rs 100
                  </p>
                </div>
              </div>
            </div>
          </div>
          

          <div className="flex flex-col gap-2">
            <div className="bg-gray-200 dark:bg-gray-800 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col">
            <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800 underline underline-offset-4 ">
              Customer
            </h3>

            <div className="flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0">
              <div className="flex justify-between xl:h-full items-stretch w-full flex-col">
                <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-2 xl:space-y-4 md:space-y-0  md:flex-row items-center md:items-start">
                  <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-2 xl:mt-4">
                    <p className="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">
                      Address: {filteredOrder?.shippingAddress}
                    </p>
                    <p className="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">
                      Phone: {filteredOrder?.phoneNumber}
                    </p>
                  </div>

                  {/* yedi orderStatus cancelled xa vane , edit order button, cancel button and delete button nadekhaune  nadekhaune */}
                  {/* cancelled vako order haru lai edit and delete garna paudaina , so kina dekhaune? */}
                  {/* only orderStatus jasko pending xa , uslai edit and delete and cancel dekhaune */}
                  <div className="w-full">
                    {filteredOrder?.orderStatus !== "cancelled" && (
                      <div className="flex flex-col gap-2">
                      <div className="flex flex-col gap-2">
                          <div className="flex w-full justify-center items-center md:justify-start md:items-start">
                          <button className=" hover:bg-green-700 hover:border-none hover:text-white cursor-pointer rounded dark:border-white dark:hover:bg-gray-900 dark:bg-transparent dark:text-white py-3  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 border border-gray-800 w-96 2xl:w-full text-base font-medium leading-4 text-gray-800">
                            Edit Order
                          </button>
                        </div>

                        <div className="flex w-full justify-center items-center md:justify-start md:items-start">
                          <button
                            onClick={cancelOrder}
                            className=" hover:bg-yellow-700 hover:border-none hover:text-white cursor-pointer rounded dark:border-white dark:hover:bg-gray-900 dark:bg-transparent dark:text-white py-3  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 border border-gray-800 w-96 2xl:w-full text-base font-medium leading-4 text-gray-800"
                          >
                            Cancel Order
                          </button>
                        </div>
                      </div>

                        <div className="flex w-full justify-center items-center md:justify-start md:items-start">
                          <button
                            onClick={deleteOrder}
                            className="mt-4 md:mt-0 bg-red-700 border-none text-white cursor-pointer rounded dark:border-white dark:hover:bg-gray-900 dark:bg-transparent dark:text-white py-3  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 border border-gray-800 w-96 2xl:w-full text-base font-medium leading-4 "
                          >
                            Delete Order
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white-200 dark:bg-white-800 w-full  xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col">
            <QRCode value={adminOrderPageUrl}/>
          </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
