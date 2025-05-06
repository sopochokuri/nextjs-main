import axios from "axios";
//const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/!api`;
const API_BASE_URL = `https://digital-cms.ge/!api`;
/***********************AXIOS EXAMPLE */
// export const Oneproduct = async (id) => {
// 	try {
// 		const response = await axios.get(
// 			`https://digital-cms.ge/!api/shop/product?id=274`,
// 			{
// 				headers: {
// 					"Content-Type": "application/json",
// 				},
// 				withCredentials: true, // Equivalent to `credentials: "same-origin"`
// 			}
// 		);

// 		console.log("response", response);
// 		return response.data; // Axios automatically parses JSON
// 	} catch (error) {
// 		console.error("Error fetching product:", error.message);
// 		throw error; // Rethrow error if needed
// 	}
// };
/***********************END AXIOS EXAMPLE */
export const Oneproduct = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/shop/product?id=${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "same-origin", // or 'include'
    }); // URL to fetch data from
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const result = await response.json(); // Parse JSON data
    return result;
    //preloader.classList.add("disabled");
  } catch (error) {
    // Store error message in state
  } finally {
    // setLoading(false);
    // Set loading to false once the fetch is complete
  }
};

export const Similarproducts = async (id) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/shop/similarproducts?productid=${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "same-origin", // or 'include'
      }
    ); // URL to fetch data from
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const result = await response.json(); // Parse JSON data
    return result;
    //preloader.classList.add("disabled");
  } catch (error) {
    // Store error message in state
  } finally {
    // setLoading(false);
    // Set loading to false once the fetch is complete
  }
};

export const Social = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/common/social`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "same-origin", // or 'include'
    }); // URL to fetch data from
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const result = await response.json(); // Parse JSON data
    return result;
    //preloader.classList.add("disabled");
  } catch (error) {
    // Store error message in state
  } finally {
    // setLoading(false);
    // Set loading to false once the fetch is complete
  }
};
export const Allproducts = async (page) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/shop/homeProducts?page=${page}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "same-origin", // or 'include'
      }
    ); // URL to fetch data from
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const result = await response.json(); // Parse JSON data
    return result;
    //preloader.classList.add("disabled");
  } catch (error) {
    // Store error message in state
  } finally {
    // setLoading(false);
    // Set loading to false once the fetch is complete
  }
};

export const ShopbyCatalog = async (page, catalog) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/shop/products?page=${page}&catalog=${catalog}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "same-origin", // or 'include'
      }
    ); // URL to fetch data from
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const result = await response.json(); // Parse JSON data
    return result;
    //preloader.classList.add("disabled");
  } catch (error) {
    // Store error message in state
  } finally {
    // setLoading(false);
    // Set loading to false once the fetch is complete
  }
};
export const Menu = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/menus/catalogMenu`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "same-origin", // or 'include'
    }); // URL to fetch data from
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const result = await response.json(); // Parse JSON data
    return result;
    //preloader.classList.add("disabled");
  } catch (error) {
    // Store error message in state
  } finally {
    // setLoading(false);
    // Set loading to false once the fetch is complete
  }
};

export const getcategory = async (id) => {
  try {
    const data = await fetch(`${API_BASE_URL}/shop/getcategory?catalog=${id}`);

    const response = await data.json(); // Await the JSON parsing
    console.log(response.category);

    if (response.category && response.category.length > 0) {
      return response.category[0].title;
    } else return "";
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const getbrand = async (id) => {
  try {
    const data = await fetch(
      `${API_BASE_URL}/shop/brandProducts?brand_id=${id}`
    );

    const response = await data.json(); // Await the JSON parsing
    return response; // Ensure that the response structure matches what you expect
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
export const getshop = async (id) => {
  try {
    const data = await fetch(`${API_BASE_URL}/shop/searchproducts?shop=${id}`);

    const response = await data.json(); // Await the JSON parsing

    return response; // Ensure that the response structure matches what you expect
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const getfooterinfo = async (id) => {
  try {
    const data = await fetch(`${API_BASE_URL}/common/page?id=${id}`);
    const response = await data.json(); // Await the JSON parsing
    return response; // Ensure that the response structure matches what you expect
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const sendsms = async (phone) => {
  try {
    const response = await fetch(
      `https://digital-cms.ge/!api/auth/getcode?phone=${phone}`
    );
    const data = await response.json();

    if (response.ok) {
      return { success: true, message: "კოდი წარმატებით გაიგზავნა!" };
    } else {
      return { success: false, message: data.message || "დაფიქსირდა შეცდომა" };
    }
  } catch (err) {
    return { success: false, message: "დაფიქსირდა ქსელის შეცდომა" };
  }
};

export const filterproducts = async (keyword) => {
  try {
    const data = await fetch(
      `https://digital-cms.ge/!api/shop/filterproducts?search=${keyword}`
    );
    const response = await data.json(); // Await the JSON parsing

    return response; // Ensure that the response structure matches what you expect
  } catch (err) {
    return { success: false, message: "დაფიქსირდა  შეცდომა" };
  }
};

export const searchproducts = async (keyword) => {
  try {
    const data = await fetch(
      `https://digital-cms.ge/!api/shop/searchproducts?search=${keyword}`
    );
    const response = await data.json(); // Await the JSON parsing

    return response; // Ensure that the response structure matches what you expect
  } catch (err) {
    return { success: false, message: "დაფიქსირდა  შეცდომა" };
  }
};
