import axios from "axios";

const TOYYIBPAY_API = "https://toyyibpay.com/index.php/api/createBill";

// Client credentials (from ToyyibPay dashboard)
const TOYYIBPAY_API_KEY = "b6g6o50n-gmmo-adzx-qgbs-1jjot2zdnorl"; //client_key
const TOYYIBPAY_CATEGORY_CODE = "jztf2erf"; //category_key code

// Create ToyyibPay Bill
export async function createBill(form, amount) {
  try {
    const payload = {
      userSecretKey: TOYYIBPAY_API_KEY,
      categoryCode: TOYYIBPAY_CATEGORY_CODE,
      billName: "Homestay Booking",
      billDescription: `Booking for ${form.name} (${form.email})`,
      billPriceSetting: 1,
      billPayorInfo: 1,
      billAmount: amount * 100, // ToyyibPay expects cents
      billReturnUrl: "https://impian-homestay.local/payment-success", // adjust
      billCallbackUrl: "https://impian-homestay.local/wp-json/homestay/v1/payment-callback", // adjust
      billExternalReferenceNo: `${form.property_id}-${Date.now()}`,
      billTo: form.name,
      billEmail: form.email,
      billPhone: form.phone_number,
    };

    const response = await axios.post(TOYYIBPAY_API, payload);
    const billCode = response.data[0]?.BillCode;

    if (!billCode) throw new Error("ToyyibPay did not return a BillCode");

    return `https://toyyibpay.com/${billCode}`;
  } catch (err) {
    console.error("ToyyibPay error:", err);
    throw err;
  }
}

