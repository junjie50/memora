import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar.js';
import Footer from '../components/footer.js';
import './ViewHotelDetails.css';
import { useParams } from 'react-router-dom';
import { retrieveAvailableHotelRooms, retrieveStaticHotelDetailByHotelID } from '../services/ascenda-api.js';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";

const RoomCard = ({ room, index, roomOrder, setRoomOrder, setIsSubmitEnabled }) => {
	const [roomCount, setCount] = useState(0);

	const handleIncrease = () => {
		setCount(roomCount + 1);
	}

	const handleDecrease = () => {
		if(roomCount > 0) {
			setCount(roomCount - 1);
		}
	}

	useEffect(() => {
		roomOrder[index] = roomCount;
		setRoomOrder(roomOrder);
		setIsSubmitEnabled(roomOrder.some((x) => x > 0));
	}, [roomCount]);

	return (
		<div className="room-card">
			<img src={room.images[0] ? room.images[0].url : ""} alt={room.name} className="room-image" loading='lazy'/>
			<div className="room-details">
				<h3 className="room-name">{room.name}</h3>
				<div className="room-description" dangerouslySetInnerHTML={{ __html: room.description }} />
				<p className="room-info">{room.additionalInfo}</p>
				<p className="room-wifi">Free WiFi</p>
				<div className="room-price-details">
					<p className="room-price">SGD {room.price.toFixed(2)}</p>
					<p className="room-stay-info">1 night, 1 adult</p>
				</div>
			</div>
			<div className="input-container">
				<div id="minus" onClick={handleDecrease}>-</div>
				<input type="text" id="number" value={roomCount} readOnly />
				<div id="plus" onClick={handleIncrease}>+</div>
			</div>
		</div>
	);
};

const RoomList = ({ rooms, roomOrder, setRoomOrder, setIsSubmitEnabled }) => {
	return (
		<div className="room-list">
			{rooms.map((room, index) => (
				<RoomCard key={room.id} room={room} index={index} roomOrder={roomOrder} setRoomOrder={setRoomOrder} setIsSubmitEnabled={setIsSubmitEnabled} />
			))}
		</div>
	);
};

const ViewHotelDetails = () => {
	const [hotel, setHotel] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [person, setPerson] = useState(null);
	const [rooms, setRooms] = useState(null);
	const [startDate, setStartDate] = useState(null);
	const [endDate, setEndDate] = useState(null);
	const { hotelId } = useParams();
	const [roomOrder, setRoomOrder] = useState([]);
	const [availRooms, setAvailRooms] = useState([]);
	const [homeForm, setHomeForm] = useState({});
	const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);

	const navigate = useNavigate();

	const handleBooking = () => {
		const newForm = homeForm;
		var roomBooking = [];

		//new added
		var totalPrice = 0;

		for(var i = 0; i < roomOrder.length; i++) {
			if(roomOrder[i] > 0) {

				//newly added for price
				const price = roomOrder[i] * availRooms[i].price;
				roomBooking.push({key:availRooms[i].key, roomOrder:roomOrder[i], price:price,
					description:availRooms[i].description, 
					breakfastInfo: availRooms[i].roomAdditionalInfo.breakfastInfo
				});
				
				//newly added for total price
				totalPrice += price;
			}
		}
		newForm.roomBooking = roomBooking;
		newForm.hotelId = hotelId;
		newForm.totalPrice = totalPrice;

		//added by main
		newForm.hotelName = hotel.name;
		newForm.hotelAddress = hotel.address;
		
		sessionStorage.setItem('bookingForm', JSON.stringify(newForm));
		navigate("/bookingPageLoggedIn", {});
	}

	useEffect(() => {
		var storedHomeForm = sessionStorage.getItem('homeForm');
		if (storedHomeForm && storedHomeForm.length > 0) {
			const formObj = JSON.parse(storedHomeForm);
			setHomeForm(formObj);
			const loadHotelData = async (data) => {
				try {
					setLoading(true);
					const formData = [hotelId, formObj.countryUID, formObj.checkin, formObj.checkout, "en_US",
						"SGD", "SG", formObj.guests, "1"];
					// get all available rooms given the condition
					//get the staic room details
					const res = await retrieveStaticHotelDetailByHotelID(hotelId);
					var hotelStatic = res.data;
					setHotel(hotelStatic);
					
					// get available rooms
					const availres = await retrieveAvailableHotelRooms(...formData);

					var res_rooms = availres.data.rooms;
					if (res_rooms && hotelStatic) {
						setAvailRooms(res_rooms);
						setError(null);
					}
					const tmp_rooms = [];
					for (var i = 0; i < res_rooms.length; i++) {
						tmp_rooms.push(0);
					}
					setRoomOrder(tmp_rooms);
				} catch (err) {
					console.error('Error in loadHotelData:', err);
					setError(`Failed to load hotel data: ${err.message}`);
				} finally {
					setLoading(false);
					setPerson(formObj.parent + formObj.children);
					setRooms(formObj.rooms);
					setStartDate(formObj.checkin)
					setEndDate(formObj.checkout)
				}
			};
			loadHotelData();
		} else {
			setLoading(false);
			setError("No home form data available");
		}
	}, []);

	if (loading) return <div>Loading...</div>;
	if (error) return (
		<div>
			<h2>Error loading hotel data</h2>
			<p>{error}</p>
			<p>Please check the console for more details.</p>
		</div>
	);

	if (!hotel) return <div>No hotel data available.</div>;
	return (
		<div>
			<Navbar />
			<div className="hotel-details">
				<div className="breadcrumb">
					<span>Hotels</span> / <span>{hotel.original_metadata.country}</span> / <span>{hotel.original_metadata.city}</span> / <span>{person} Person {rooms} Room</span> / <span>{startDate} - {endDate}</span>
				</div>

				<div className="detailspg-hotel-card">
					<img
						src={`${hotel.image_details.prefix}${hotel.default_image_index}${hotel.image_details.suffix}`}
						alt={hotel.name}
						className="detailspg-hotel-image"
					/>
					<div className="detailspg-hotel-info">
						<h1>{hotel.name}</h1>
						<p>{hotel.address}</p>
						<div className="rating">
							{[...Array(5)].map((_, i) => (
								<span key={i} className={i < Math.floor(hotel.rating) ? "star filled" : "star"}>★</span>
							))}
							<span>{hotel.rating} / 5</span>
						</div>
						<p className="trustyou-score">TrustYou Score: {hotel.trustyou.score.overall}</p>
						<button className="see-rooms-btn">See Rooms</button>
					</div>
				</div>

				<div className="content-wrapper">
					<div className="detailspg-main-content">
						<section className="hotel-overview">
							<h2>Hotel overview</h2>
							<div dangerouslySetInnerHTML={{ __html: hotel.description }} />
						</section>

						<section className="review">
							<h2>Review</h2>
							{hotel.amenities_ratings.map((rating, index) => (
								<div key={index} className="rating-bar">
									<span className="category">{rating.name}</span>
									<div className="bar-container">
										<div className="bar" style={{ width: `${rating.score}%` }}></div>
									</div>
									<span className="score">{rating.score}</span>
								</div>
							))}
							<button className="see-more-btn">See more</button>
						</section>
					</div>

					<aside className="sidebar">
						<h2>Amenities</h2>
						<ul className="amenities-list">
							{Object.entries(hotel.amenities)
								.filter(([_, value]) => value === true)
								.map(([key]) => {
									if (key === 'tVInRoom') {
										return <li key={key}>TV In Room</li>;
									}
									return (
										<li key={key}>
											{key
												.replace(/([A-Z])/g, ' $1') // add a space before each uppercase letter
												.replace(/([a-z])([A-Z])/g, '$1 $2') // handle cases where a lowercase letter is followed by an uppercase letter
												.replace(/\b\w/g, (char) => char.toUpperCase()) // capitalize the first letter of each word
												.trim()}
										</li>
									);
								}
								)
							}
						</ul>
					</aside>
				</div>

				<section className="hotel-categories">
					<h2>Hotel Categories</h2>
					<div className="category-card">
						{Object.entries(hotel.categories).map(([key, category]) => (
							<div key={key} className="category-card">
								<h3>{category.name}</h3>
								<p>Score: {category.score}</p>
								<p>Popularity: {(category.popularity)? category.popularity.toFixed(2) : "Not Available"}</p>
							</div>
						))}
					</div>
				</section>

				<RoomList rooms={availRooms} roomOrder={roomOrder} setRoomOrder={setRoomOrder} setIsSubmitEnabled={setIsSubmitEnabled} />
			</div>
			<div className="button-container">
				<div className="button-center">
					<Button
						style={{ fontSize: '30px', fontWeight: 'bold', backgroundColor: isSubmitEnabled ? "#1d3d73" : "gray" }}
						variant="contained"
						className="submit-button"
						onClick={handleBooking}
						disabled={!isSubmitEnabled}
					>
						Submit
					</Button>
				</div>
			</div>
			<Footer />
		</div>
		);
	};
	
export default ViewHotelDetails;