import React, { useState, useEffect } from "react";
import Delivery from "../views/Delivery";
import { Cookies } from 'react-cookie';
import {useNavigate} from "react-router-dom";


function DeliveryController() {

    const cookie = new Cookies();
    const userId = cookie.get("id");
    const orderId = cookie.get("order");
    const navigate = useNavigate();
    const [days, setDays] = useState([]);

    useEffect(() => {
        
        if (userId === undefined){  
            alert("Sign in to view your delivery.");
            navigate("/signin");
            return;
        }
        else if (orderId === 'undefined' || orderId === undefined) {
            alert("You need to place an order before you can access delivery.");
            navigate("/shop");
            return;
        }
        else {
            showInfo();
            getDays();
        }
        
    }, []);

    const getDays = () => {
        const today = new Date();
        const d1 = new Date();
        const d2 = new Date(); 
        const d3 = new Date();
        const d4 = new Date();
        const d5 = new Date();
        d1.setDate(today.getDate() + 1);
        d2.setDate(today.getDate() + 2);
        d3.setDate(today.getDate() + 3);
        d4.setDate(today.getDate() + 4);
        d5.setDate(today.getDate() + 5);

        setDays([d1.toISOString().slice(0,10), d2.toISOString().slice(0,10), d3.toISOString().slice(0,10), d4.toISOString().slice(0,10), d5.toISOString().slice(0,10)]); 
    }

    const showInfo = () => {
        var branch = document.getElementById("stores").value;
        var destAddress = document.getElementById("address").value;
        var date = document.getElementById("dates").value;
        var time = document.getElementById("times").value;

        var output = document.getElementById("output");
        output.innerHTML = "<strong>Store Branch: </strong>" + branch + "<br><strong>Destination Address: </strong>" + destAddress + 
        "<br><strong>Delivery Date: </strong>" + date + "<br><strong>Delivery Time: </strong>" + time;
    }
                
    const calculateRoute = () => {
        var branch = document.getElementById("stores").value;
        var destAddress = document.getElementById("address").value;
        var date = document.getElementById("dates").value;
        var time = document.getElementById("times").value;

        if (branch === "") {
            alert("Please choose a store branch.")
            return;
        }
        else if (destAddress === null || destAddress.trim() === ""){
            alert("Please enter a destination address.")
            return;
        }
        else if (date === "") {
            alert("Please enter a date for delivery.");
            return;
        }
        else if (time === "") {
            alert("Please enter a time for delivery.");
            return;
        }

        var branchArray = branch.split(', ');
        const branchAddress = branchArray[1] + ", " + branchArray[2] + ", " + branchArray[3];
        
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDHJ6QlEeLkZt0Y-KdTAsS7Uw4EBEBRXpY`;
        script.onload = () => {
            console.log("check");
            const map = new window.google.maps.Map(document.getElementById("map"), {
                zoom: 11,
                mapTypeId: window.google.maps.MapTypeId.ROADMAP,
        });

            const directionsService = new window.google.maps.DirectionsService();

            directionsService.route(
            {
                origin: branchAddress,
                destination: destAddress,
                travelMode: "DRIVING",
            },
            (response, status) => {
                if (status === "OK") {
                document.getElementById("map").style.display = "block";
                document.getElementById("orderButtonContainer").style.display = "inline";
                new window.google.maps.DirectionsRenderer({
                    suppressMarkers: true,
                    directions: response,
                    map: map,
                });

                var branchGeocoder = new window.google.maps.Geocoder();
                branchGeocoder.geocode({ address: branchAddress }, (results, status) => {
                    if (status === window.google.maps.GeocoderStatus.OK) {
                    const branchLatitude = results[0].geometry.location.lat();
                    const branchLongitude = results[0].geometry.location.lng();
                    const branchLocation = { lat: branchLatitude, lng: branchLongitude };

                    const marker = new window.google.maps.Marker({ position: branchLocation, map: map });

                    const infoWindow = new window.google.maps.InfoWindow({ content: "<h5> source </h5>" });

                    marker.addListener("click", function () {
                        infoWindow.open(map, marker);
                    });
                    } else {
                    alert("The route could not be calculated for the following reasons: " + status);
                    }
                });

                var destinationGeocoder = new window.google.maps.Geocoder();
                destinationGeocoder.geocode({ address: destAddress }, (results, status) => {
                    if (status === window.google.maps.GeocoderStatus.OK) {
                    const destLatitude = results[0].geometry.location.lat();
                    const destLongitude = results[0].geometry.location.lng();
                    const destLocation = { lat: destLatitude, lng: destLongitude };

                    const marker2 = new window.google.maps.Marker({ position: destLocation, map: map });

                    const infoWindow2 = new window.google.maps.InfoWindow({ content: "<h5> destination </h5>" });

                    marker2.addListener("click", function () {
                        infoWindow2.open(map, marker2);
                    });
                    } else {
                    alert("The route could not be calculated for the following reasons: " + status);
                    }
                });
                } else {
                document.getElementById("map").style.display = "none";
                alert("The route could not be calculated for the following reasons: " + status);
                }
            }
        );}
        document.getElementById("main").appendChild(script);
    }
    
    const hideOrderButton = () => {
        document.getElementById("orderButtonContainer").style.display = "none";
        document.getElementById("map").style.display = "none";
    }

    const HideOrderButtonForDateAndTime = () => {
        var date = document.getElementById("dates").value;
        var time = document.getElementById("times").value;

        if (date == "" || time == "") {
            document.getElementById("orderButtonContainer").style.display = "none";
            document.getElementById("map").style.display = "none";
        }
    }
    
    const deliver=(storesValue, destinationValue, datesValue, timesValue)=>{
        fetch("http://localhost/cps630backend/delivery.php", {
            method: "POST",
            body: JSON.stringify({stores: storesValue, destination: destinationValue, dates: datesValue, times: timesValue, order: orderId}),
        })

        .then((response) => response.text())
        .then((data) => {
            if (data === 'No Order'){
                alert('You need to place an order first.');
            }
            else if (data === 'No Store Branches'){
                alert('There are no store branches');
            }
            else if (data === 'No Trucks Available'){
                alert('There are no trucks available');
            }
            else if (data === 'Failure'){
                alert('There was some error creating the trip.');
            }
            else{
                alert("Thank you for shopping with us. Your Order Id is: " + orderId + ".");
                cookie.set('order', undefined);
                navigate("/");
            }
        })
        .catch((error) => console.error(error));
    }
    
    return (
        <Delivery days={days} showInfo={showInfo} calculateRoute={calculateRoute} hideOrderButton={hideOrderButton} deliver={deliver} 
        HideOrderButtonForDateAndTime={HideOrderButtonForDateAndTime}/>
    )
}
export default DeliveryController;