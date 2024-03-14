"use client"

import React, {useState, useEffect} from 'react'
import useCartStore from '@/store/cartStore'
import { fetchOrderDetails } from '../api/orderDetails'
import CartItem from './components/CartItem'
import CartSummaryBox from './components/CartSummaryBox'
import AddressInfo from './components/AddressInfo'
import { useRouter } from 'next/navigation'
import { fetchthemeDetails } from '../api/themedetals'
import { WiMoonWaxing6 ,WiSunrise} from "react-icons/wi";

interface Brand {
  merchantName: string;
  merchantLogo: string;
}

export default function Home() {  

  //if(typeof window !== 'undefined'){

  let root: HTMLElement;
  if(typeof window !== 'undefined'){
    root = document.documentElement;
  }
   
  
  const [theme, setTheme] = useState({
    "--background": "",
    "--foreground": "",
    "--primary": "",
    "--primary-foreground": ""
  });
  const [darkMode, setDarkMode] = useState(false);

  let { products, totalAmount, setCart } = useCartStore();
  const [loading, setLoading] = useState(true);
  
  const router = useRouter();


  const [brand, setBrand] = useState<Brand | null>(null);

  useEffect(() => {
    const fetchBrand = async () => {
      try {
        const response = await fetchthemeDetails() // fetch('https://groww-intern-assignment.vercel.app/v1/api/merchant-metadata');
        const data = await response.json();
        
        // console.log("data",data);
        console.log(data.theme["--background"]);
        
      
        setBrand({ merchantName: data.merchantName, merchantLogo: data.merchantLogo });
  
          setTheme({
            "--background": data.theme["--background"],
            "--foreground": data.theme["--foreground"],
            "--primary": data.theme["--primary"],
            "--primary-foreground": data.theme["--primary-foreground"],
          });
        

        console.log(theme);
        
  
      } catch (error) {
        console.error('Error fetching brand data:', error);
      }
    };
  
    fetchBrand();
  }, []); 
  
  const applyStyles = () => {
    
    

    if (darkMode) {
      // Set dark mode colors
      // console.log(theme["--background"]);
      /*
        green
        --background hsl(20, 14.3%, 4.1%)
        --foreground hsl(0, 0%, 95%)
        --primary hsl(142.1, 70.6%, 45.3%)
        --primary-foreground hsl(144.9, 80.4%, 10%)

        yellow
        --background hsl(20, 14.3%, 4.1%)
        --foreground hsl(60, 9.1%, 97.8%)
        --primary hsl(47.9, 95.8%, 53.1%)
        --primary-foreground hsl(26, 83.3%, 14.1%)

        red
        --background hsl(20, 14.3%, 4.1%)
        --foreground hsl(0, 0%, 95%)
        --primary hsl(346.8, 77.2%, 49.8%)
        --primary-foreground hsl(355.7, 100%, 97.3%)

        blue
        --background hsl(222.2, 84%, 4.9%)
        --foreground hsl(210, 40%, 98%)
        --primary hsl(217.2, 91.2%, 59.8%)
        --primary-foreground hsl(222.2, 47.4%, 11.2%)

        black
        --background hsl(0, 0%, 100%)
        --foreground hsl(240, 10%, 3.9%)
        --primary hsl(240, 5.9%, 10%) 
        --primary-foreground hsl(0, 0%, 98%)
      */
      if(theme["--background"]=="hsl(20, 14.3%, 4.1%)" && theme["--foreground"]=="hsl(0, 0%, 95%)" &&
        theme["--primary"]=="hsl(142.1, 70.6%, 45.3%)" && theme["--primary-foreground"]=="hsl(144.9, 80.4%, 10%)"
      ){//green
        
        console.log("setting dark mode")
        root.style.setProperty('background', "hsl(120, 100%, 20%)");//120° , 100% , 20%
        root.style.setProperty('foreground', "hsl(53, 88%, 49%)");
        root.style.setProperty('color', 'hsl(53, 88%, 100%)');

      }else if(theme["--background"]=="hsl(222.2, 84%, 4.9%)" && theme["--foreground"]=="hsl(210, 40%, 98%)" &&
        theme["--primary"]=="hsl(217.2, 91.2%, 59.8%)" && theme["--primary-foreground"]=="hsl(222.2, 47.4%, 11.2%)"){// blue
          root.style.setProperty('background', "hsl(267, 100%, 22%)");
          root.style.setProperty('foreground', "hsl(53, 88%, 49%)");
          root.style.setProperty('color', 'hsl(53, 88%, 100%)');
        }else if(theme["--background"]=="hsl(20, 14.3%, 4.1%)" && theme["--foreground"]=="hsl(60, 9.1%, 97.8%)" &&//yellow
        theme["--primary"]=="hsl(47.9, 95.8%, 53.1%)" && theme["--primary-foreground"]=="hsl(26, 83.3%, 14.1%)"){
          root.style.setProperty('background', "hsl(53, 68%, 50%)");
          root.style.setProperty('foreground', "hsl(53, 88%, 49%)");
          root.style.setProperty('color', 'hsl(53, 88%, 100%)');
        }else if(theme["--background"]=="hsl(20, 14.3%, 4.1%)" && theme["--foreground"]=="hsl(0, 0%, 95%)" &&//red
        theme["--primary"]=="hsl(346.8, 77.2%, 49.8%)" && theme["--primary-foreground"]=="hsl(355.7, 100%, 97.3%)"){
          root.style.setProperty('background', "hsl(332, 54%, 43%)");
          root.style.setProperty('foreground', "hsl(53, 88%, 49%)");
          root.style.setProperty('color', 'hsl(53, 88%, 100%)');
        }
      // console.log("hsl(53, 88%, 49%)");
    }else{
      for (const [property, value] of Object.entries(theme)) {
        if(property == '--primary'){
          //root.style.setProperty('backgroundColor', value);
          root.style.backgroundColor = value;
          
        }else if (property == '--primary-foreground'){
          if(theme["--background"]=="hsl(20, 14.3%, 4.1%)" && theme["--foreground"]=="hsl(0, 0%, 95%)" &&//red
        theme["--primary"]=="hsl(346.8, 77.2%, 49.8%)" && theme["--primary-foreground"]=="hsl(355.7, 100%, 97.3%)"){
          root.style.setProperty('color', 'hsl(222.2, 47.4%, 11.2%)');

        }else{
          root.style.setProperty('color', value);
        }
          //root.style.color = value;
        }
        else if (property == '--background'){
          root.style.setProperty('--background', value)
        }
        else if (property == '--foreground'){
          root.style.setProperty('--foreground', value)
        }
        // root.style.setProperty('color', 'hsl(53, 88%, 100%)');
        console.log(property,value);
      }
    }

  };
  
  useEffect(() => {
    
    applyStyles();
  }, [theme, darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  
  const handlePaymentClick = () => {
    router.push('/Payemnt')
  };

  useEffect(() => {
    const fetchData = async () => {
      if (typeof document !== 'undefined') {
      const val = document.documentElement.style;
      
      console.log("val",val);
      
      try {
        const response = await fetchOrderDetails();
        
        console.log(totalAmount);
        setCart(response);
      } catch (error) {
        console.error('Error fetching data:', error);
        setCart({ products: [], paymentMethods: [], totalAmount: 0 });
      } finally {
        setLoading(false);
      }
    };
  }
    fetchData();
// }
  }, []);

  totalAmount.toFixed(2); 
  
  const deliveryFees = 10;
  const discount = -5;
  const priceAmount = totalAmount - 5;

  totalAmount.toFixed(2);
  priceAmount.toFixed(2);
  // console.log(brand);    

  return (
    <div className="container mx-auto p-4 m-4 mb-8 header-section">

      <div className={`flex flex-col sm:flex-row p-2 justify-between ${darkMode ? 'bg-gray-700' : 'bg-gray-300'} rounded-md items-center`}>
        <div className='ml-4 mb-2 sm:mb-0 flex flex-wrap flex-row items-center'>
          {brand && (
            <img className='w-10 h-10 rounded-full max-w-full' src={brand.merchantLogo} alt={brand.merchantName} />
            )}
          {brand && <div className='ml-2 font-semibold'>{brand.merchantName}</div>}
        </div>
        <h1 className="text-3xl font-semibold justify-center mb-4 sm:mb-0 pt-2 sm:pt-0">Checkout</h1>
        <div className='text-2xl'>
            <button onClick={toggleDarkMode}>{darkMode ? <WiSunrise /> : <WiMoonWaxing6 />}</button>
        </div>
    </div>
  
      <AddressInfo darkMode={darkMode} />
  
      {loading ? (
        <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-300'} p-4 rounded-md`}>
          {/* {root.style.backgroundColor = theme['--foreground']} */}
          <p>Loading...</p>
        </div>
      ) : (
        <>
          {products.length === 0 ? (
            <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-300'} p-4 rounded-md`}>
              <p>Your cart is empty</p>
            </div>
          ) : (
            <>
              <h2 className="font-bold ml-4 text-2xl m-4 mt-8">Order List</h2>
              <div className="grid gap-4 product-list">
                {products.map((product) => (
                  <CartItem key={product.id} product={product} darkMode={darkMode} />
                  ))}
              </div>
  
              <h2 className={`font-bold ml-4 ${darkMode ? 'bg-gray-700' : 'bg-gray-300'} text-2xl m-3 p-3 mx-8 rounded-md mt-8`}>Order Summary</h2>
              <div className={`grid grid-rows-1 sm:grid-rows-2 lg:grid-rows-3 ${darkMode ? 'bg-gray-700' : 'bg-gray-300'} gap-4 rounded-md w-auto`}>
  
                <CartSummaryBox title="Total Amount Payable" value={`$${priceAmount.toFixed(2)}`} />
  
                <CartSummaryBox title="Delivery Fees" value={`$${deliveryFees}`} />
  
                <CartSummaryBox title="discount" value={`$${discount}`} />
              </div>
  
              <div className={`flex flex-col sm:flex-row justify-between ${darkMode ? 'bg-gray-700' : 'bg-gray-300'} mt-4 p-4 rounded-md`}>
                <div className='flex flex-col font-sans'>
                  <div className='font-light text-sm'>TOTAL</div>
                  <div className='font-semibold'>
                    {totalAmount.toFixed(2)}
                  </div>
                </div>
  
                <button
                  className='bg-orange-600 p-2 px-4 transition-transform transform hover:scale-110 rounded-md mt-1'
                  onClick={handlePaymentClick}
                >Payment</button>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );

 // }
  

}