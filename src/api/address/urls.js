const baseUrl = process.env.BASE_API;
export default {
  addressList: baseUrl + "/getUserAddressByUserId",
  deleteAddress: baseUrl + "/delUserAddress",
  getAddressById: baseUrl + "/getUserAddressByAddressId",
  updateAddress: baseUrl + "/updateAddress",
  addAddress: baseUrl + "/generateAddr",
};
