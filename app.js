
  var buttons = document.getElementById('form01'),
		apiKey;

	buttons.addEventListener("click", store);

	apiKey = 'snVmMEGvwBlU4ZAGpb2D9YFAmU0zbq9SeAOH7Ktf';

	function getResidential(user_address,user_month) {
		jQuery.ajax({
			url: 'http://developer.nrel.gov/api/utility_rates/v3.json',
			data:	   {api_key : apiKey, address : user_address},
			success:   function(data) {
			 var res = data.outputs.residential;
				 jQuery.ajax({
					 url: 'http://developer.nrel.gov/api/pvwatts/v5.json',
					 data:	{api_key : apiKey, system_capacity : 5, module_type : 1, losses: 85, array_type: 1, tilt: 32, azimuth : 0, address : user_address},
					 success: function(data) {
											var mon = data.outputs.poa_monthly[user_month];
											var pay = 32*.2*res*mon;
	
											console.log('$',pay);
											pay = Math.round(pay).toFixed(2);
											document.getElementById('moneySaved').innerHTML = pay;	
										}
				 });

			}
		 });			 
	}

	function store() {
		'use strict';
    var inaddress = document.getElementById('inputAddress').value,
    	incity = document.getElementById('inputCity').value,
    	instate = document.getElementById('inputState').value,
    	inbill = document.getElementById('inputElecticBill').value,
    	inmonth = document.getElementById('inputMonth').value;
			
			sessionStorage.address = inaddress;
			sessionStorage.city = incity;
			sessionStorage.state = instate;
			sessionStorage.bill = inbill;
			sessionStorage.month = inmonth;
  }

  function get(){
  	var month = sessionStorage.getItem("month"),
  		monthName = "",
			full_address; 
			
		if (sessionStorage.address === undefined) {
			return false;
		}
		
		switch (month) {
			case "0":
				monthName = "January";
				break;
			case "1":
				monthName = "February"; 
				break; 
			case "2":
				monthName = "March"; 
				break; 
			case "3":
				monthName = "April";
				break;
			case "4":
				monthName = "May"; 
				break; 
			case "5":
				monthName = "June"; 
				break; 
			case "6":
				monthName = "July";
				break;
			case "7":
				monthName = "August"; 
				break; 
			case "8":
				monthName = "September"; 
				break; 
			case "9":
				monthName = "October";
				break;
			case "10":
				monthName = "November"; 
				break; 
			case "11":
				monthName = "December"; 
				break;       
			default:
				console.log("No months entered!");
		}
		full_address = sessionStorage.address.concat(" ", sessionStorage.city, ", ", sessionStorage.state);
		
		document.getElementById('inputAddress').value = sessionStorage.address;
		document.getElementById('inputCity').value = sessionStorage.city;
		document.getElementById('inputState').value = sessionStorage.state;
		document.getElementById('inputElecticBill').value = sessionStorage.bill;
		document.getElementById('inputMonth').value = sessionStorage.month;

		document.getElementById('billMonth').innerHTML = monthName;
		document.getElementById('electricBill').innerHTML = sessionStorage.bill;
		document.getElementById('fullAddress').innerHTML = full_address;

		getResidential(full_address,month);
  }	
	
  get();
 