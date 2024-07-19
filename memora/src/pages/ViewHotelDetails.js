import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar.js';
import Footer from '../components/footer.js';
import './ViewHotelDetails.css';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { fetchStaticHotelData } from '../services/ascenda-api.js';
import { useLocation } from 'react-router-dom';


const data = {
  "searchCompleted": null,
  "completed": true,
  "status": null,
  "currency": null,
  "rooms": [
      {
          "key": "er-D4BA4388A2DE0E55F420A507ADAC2D99-151F43A5B56806D2B7F608848DAD45F4",
          "roomDescription": "Premier Courtyard Room King",
          "roomNormalizedDescription": "Premier Courtyard Room King",
          "type": "202115747",
          "free_cancellation": false,
          "roomAdditionalInfo": {
              "breakfastInfo": "hotel_detail_room_only",
              "displayFields": {
                  "special_check_in_instructions": null,
                  "check_in_instructions": null,
                  "know_before_you_go": null,
                  "fees_optional": null,
                  "fees_mandatory": null,
                  "kaligo_service_fee": 324.79,
                  "hotel_fees": [],
                  "surcharges": [
                      {
                          "type": "TaxAndServiceFee",
                          "amount": 389.88
                      }
                  ]
              }
          },
          "description": "Premier Courtyard Room King",
          "long_description": "<p><strong>1 King Bed</strong></p><p>452-sq-foot room with courtyard views </p><br/><p><b>Entertainment</b> - 55-inch LCD TV with satellite channels</p><p><b>Food & Drink</b> - Coffee/tea maker, minibar (fees may apply), electric kettle, and room service (limited hours)</p><p><b>Sleep</b> - Premium bedding, a pillow menu, blackout drapes/curtains, turndown service, and bed sheets </p><p><b>Bathroom</b> - Private bathroom, deep soaking bathtub and separate shower</p><p><b>Practical</b> - Laptop-compatible safe, laptop workspace, and phone; rollaway/extra beds and free cribs/infant beds available on request</p><p><b>Comfort</b> - Air conditioning and daily housekeeping</p><p>Non-Smoking</p>",
          "images": [
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/0c4c3ec8_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/0c4c3ec8_z.jpg",
                  "hero_image": true
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/c9ae1636_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/c9ae1636_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/b7789631_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/b7789631_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/6d67fe22_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/6d67fe22_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/7dbae3db_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/7dbae3db_z.jpg",
                  "hero_image": false
              }
          ],
          "amenities": [
              "Air conditioning",
              "Daily housekeeping",
              "Non-Smoking",
              "Wireless internet access",
              "Premium bedding",
              "Slippers",
              "Laptop-friendly workspace",
              "Separate bathtub and shower",
              "Number of beds - 2",
              "TV size measurement: inch",
              "Satellite TV service",
              "Private bathroom",
              "Towels provided",
              "Free bottled water",
              "TV size: 55",
              "Deep soaking bathtub",
              "LCD TV",
              "Wardrobe or closet",
              "Blackout drapes/curtains",
              "Television",
              "Minibar",
              "Bedsheets provided",
              "Desk",
              "Pillow menu",
              "In-room safe (laptop compatible)",
              "Free cribs/infant beds",
              "Bathrobes",
              "Iron/ironing board (on request)",
              "Electric kettle",
              "Hair dryer",
              "Turndown service",
              "Coffee/tea maker",
              "Room service (limited hours)",
              "Phone",
              "Rollaway/extra beds (surcharge)",
              "Free toiletries"
          ],
          "price_type": "single",
          "max_cash_payment": 2673.71,
          "coverted_max_cash_payment": 3679.35,
          "points": 91975,
          "bonuses": 0,
          "bonus_programs": [],
          "bonus_tiers": [],
          "lowest_price": 2673.71,
          "price": 3679.35,
          "converted_price": 3679.35,
          "lowest_converted_price": 3679.35,
          "chargeableRate": 2673.71,
          "market_rates": [
              {
                  "supplier": "expedia",
                  "rate": 3232.402367376
              }
          ],
          "base_rate": 2283.83,
          "included_taxes_and_fees_total": 389.88,
          "excluded_taxes_and_fees_total": 0,
          "excluded_taxes_and_fees_total_in_currency": 0,
          "included_taxes_and_fees": [
              {
                  "id": "tax_and_service_fee",
                  "amount": 389.88
              }
          ]
      },
      {
          "key": "er-D4BA4388A2DE0E55F420A507ADAC2D99-9CF6BA56ABCE327F9357B39828CADF74",
          "roomDescription": "Premier Courtyard Room Twin",
          "roomNormalizedDescription": "Premier Courtyard Twin Room",
          "type": "320753924",
          "free_cancellation": false,
          "roomAdditionalInfo": {
              "breakfastInfo": "hotel_detail_room_only",
              "displayFields": {
                  "special_check_in_instructions": null,
                  "check_in_instructions": null,
                  "know_before_you_go": null,
                  "fees_optional": null,
                  "fees_mandatory": null,
                  "kaligo_service_fee": 324.79,
                  "hotel_fees": [],
                  "surcharges": [
                      {
                          "type": "TaxAndServiceFee",
                          "amount": 389.88
                      }
                  ]
              }
          },
          "description": "Premier Courtyard Room Twin",
          "long_description": "<p><strong>2 Twin Beds</strong></p><p>452-sq-foot room with courtyard views </p><br/><p><b>Entertainment</b> - 55-inch LCD TV with satellite channels</p><p><b>Food & Drink</b> - Coffee/tea maker, minibar (fees may apply), electric kettle, and room service (limited hours)</p><p><b>Sleep</b> - Premium bedding, a pillow menu, blackout drapes/curtains, turndown service, and bed sheets </p><p><b>Bathroom</b> - Private bathroom, deep soaking bathtub and separate shower</p><p><b>Practical</b> - Laptop-compatible safe, laptop workspace, and phone; rollaway/extra beds and free cribs/infant beds available on request</p><p><b>Comfort</b> - Air conditioning and daily housekeeping</p><p>Non-Smoking</p>",
          "images": [
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/ce410bf1_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/ce410bf1_z.jpg",
                  "hero_image": true
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/c9ae1636_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/c9ae1636_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/b7789631_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/b7789631_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/6d67fe22_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/6d67fe22_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/7dbae3db_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/7dbae3db_z.jpg",
                  "hero_image": false
              }
          ],
          "amenities": [
              "Air conditioning",
              "Daily housekeeping",
              "Non-Smoking",
              "Wireless internet access",
              "Premium bedding",
              "Slippers",
              "Laptop-friendly workspace",
              "Separate bathtub and shower",
              "Number of beds - 2",
              "TV size measurement: inch",
              "Satellite TV service",
              "Private bathroom",
              "Towels provided",
              "Free bottled water",
              "TV size: 55",
              "Deep soaking bathtub",
              "LCD TV",
              "Wardrobe or closet",
              "Blackout drapes/curtains",
              "Television",
              "Minibar",
              "Bedsheets provided",
              "Desk",
              "Pillow menu",
              "In-room safe (laptop compatible)",
              "Free cribs/infant beds",
              "Bathrobes",
              "Iron/ironing board (on request)",
              "Electric kettle",
              "Hair dryer",
              "Turndown service",
              "Coffee/tea maker",
              "Room service (limited hours)",
              "Phone",
              "Rollaway/extra beds (surcharge)",
              "Free toiletries"
          ],
          "price_type": "single",
          "max_cash_payment": 2673.71,
          "coverted_max_cash_payment": 3679.35,
          "points": 91975,
          "bonuses": 0,
          "bonus_programs": [],
          "bonus_tiers": [],
          "lowest_price": 2673.71,
          "price": 3679.35,
          "converted_price": 3679.35,
          "lowest_converted_price": 3679.35,
          "chargeableRate": 2673.71,
          "market_rates": [],
          "base_rate": 2283.83,
          "included_taxes_and_fees_total": 389.88,
          "excluded_taxes_and_fees_total": 0,
          "excluded_taxes_and_fees_total_in_currency": 0,
          "included_taxes_and_fees": [
              {
                  "id": "tax_and_service_fee",
                  "amount": 389.88
              }
          ]
      },
      {
          "key": "er-D4BA4388A2DE0E55F420A507ADAC2D99-47677DE520DE00571E4F65515E5F8A9D",
          "roomDescription": "Heritage Room King",
          "roomNormalizedDescription": "Heritage Room King",
          "type": "504904",
          "free_cancellation": false,
          "roomAdditionalInfo": {
              "breakfastInfo": "hotel_detail_room_only",
              "displayFields": {
                  "special_check_in_instructions": null,
                  "check_in_instructions": null,
                  "know_before_you_go": null,
                  "fees_optional": null,
                  "fees_mandatory": null,
                  "kaligo_service_fee": 346.85,
                  "hotel_fees": [],
                  "surcharges": [
                      {
                          "type": "TaxAndServiceFee",
                          "amount": 416.4
                      }
                  ]
              }
          },
          "description": "Heritage Room King",
          "long_description": "<p><strong>1 King Bed</strong></p><p>409-sq-foot room with courtyard views </p><br/><p><b>Entertainment</b> - 55-inch LCD TV with satellite channels</p><p><b>Food & Drink</b> - Coffee/tea maker, minibar (fees may apply), electric kettle, and room service (limited hours)</p><p><b>Sleep</b> - Premium bedding, a pillow menu, blackout drapes/curtains, turndown service, and bed sheets </p><p><b>Bathroom</b> - Private bathroom, deep soaking bathtub and separate shower</p><p><b>Practical</b> - Laptop-compatible safe, laptop workspace, and phone; rollaway/extra beds and free cribs/infant beds available on request</p><p><b>Comfort</b> - Air conditioning and daily housekeeping</p><p>Non-Smoking</p>",
          "images": [
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/3660b659_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/3660b659_z.jpg",
                  "hero_image": true
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/d6fefe25_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/d6fefe25_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/c9ae1636_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/c9ae1636_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/b7789631_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/b7789631_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/6d67fe22_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/6d67fe22_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/7dbae3db_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/7dbae3db_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/ae7560bb_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/ae7560bb_z.jpg",
                  "hero_image": false
              }
          ],
          "amenities": [
              "Air conditioning",
              "Daily housekeeping",
              "Non-Smoking",
              "Wireless internet access",
              "Premium bedding",
              "Slippers",
              "Laptop-friendly workspace",
              "Separate bathtub and shower",
              "Number of beds - 2",
              "TV size measurement: inch",
              "Satellite TV service",
              "Private bathroom",
              "Towels provided",
              "Free bottled water",
              "TV size: 55",
              "Deep soaking bathtub",
              "LCD TV",
              "Wardrobe or closet",
              "Blackout drapes/curtains",
              "Television",
              "Minibar",
              "Bedsheets provided",
              "Desk",
              "Pillow menu",
              "In-room safe (laptop compatible)",
              "Free cribs/infant beds",
              "Bathrobes",
              "Iron/ironing board (on request)",
              "Electric kettle",
              "Hair dryer",
              "Turndown service",
              "Coffee/tea maker",
              "Room service (limited hours)",
              "Phone",
              "Rollaway/extra beds (surcharge)",
              "Free toiletries"
          ],
          "price_type": "single",
          "max_cash_payment": 2855.49,
          "coverted_max_cash_payment": 3929.5,
          "points": 98225,
          "bonuses": 0,
          "bonus_programs": [],
          "bonus_tiers": [],
          "lowest_price": 2855.49,
          "price": 3929.5,
          "converted_price": 3929.5,
          "lowest_converted_price": 3929.5,
          "chargeableRate": 2855.49,
          "market_rates": [],
          "base_rate": 2439.09,
          "included_taxes_and_fees_total": 416.4,
          "excluded_taxes_and_fees_total": 0,
          "excluded_taxes_and_fees_total_in_currency": 0,
          "included_taxes_and_fees": [
              {
                  "id": "tax_and_service_fee",
                  "amount": 416.4
              }
          ]
      },
      {
          "key": "er-D4BA4388A2DE0E55F420A507ADAC2D99-AECD6919D2892FF7E30B7C68237D94E2",
          "roomDescription": "Heritage Room Twin",
          "roomNormalizedDescription": "Heritage Twin Room",
          "type": "320753953",
          "free_cancellation": false,
          "roomAdditionalInfo": {
              "breakfastInfo": "hotel_detail_room_only",
              "displayFields": {
                  "special_check_in_instructions": null,
                  "check_in_instructions": null,
                  "know_before_you_go": null,
                  "fees_optional": null,
                  "fees_mandatory": null,
                  "kaligo_service_fee": 346.85,
                  "hotel_fees": [],
                  "surcharges": [
                      {
                          "type": "TaxAndServiceFee",
                          "amount": 416.4
                      }
                  ]
              }
          },
          "description": "Heritage Room Twin",
          "long_description": "<p><strong>2 Twin Beds</strong></p><p>409-sq-foot room with courtyard views </p><br/><p><b>Entertainment</b> - 55-inch LCD TV with satellite channels</p><p><b>Food & Drink</b> - Coffee/tea maker, minibar (fees may apply), electric kettle, and room service (limited hours)</p><p><b>Sleep</b> - Premium bedding, a pillow menu, blackout drapes/curtains, turndown service, and bed sheets </p><p><b>Bathroom</b> - Private bathroom, deep soaking bathtub and separate shower</p><p><b>Practical</b> - Laptop-compatible safe, laptop workspace, and phone; rollaway/extra beds and free cribs/infant beds available on request</p><p><b>Comfort</b> - Air conditioning and daily housekeeping</p><p>Non-Smoking</p>",
          "images": [
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/640dedec_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/640dedec_z.jpg",
                  "hero_image": true
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/c9ae1636_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/c9ae1636_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/b7789631_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/b7789631_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/6d67fe22_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/6d67fe22_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/7dbae3db_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/7dbae3db_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/ae7560bb_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/ae7560bb_z.jpg",
                  "hero_image": false
              }
          ],
          "amenities": [
              "Air conditioning",
              "Daily housekeeping",
              "Non-Smoking",
              "Wireless internet access",
              "Premium bedding",
              "Slippers",
              "Laptop-friendly workspace",
              "Separate bathtub and shower",
              "Number of beds - 2",
              "TV size measurement: inch",
              "Satellite TV service",
              "Private bathroom",
              "Towels provided",
              "Free bottled water",
              "TV size: 55",
              "Deep soaking bathtub",
              "LCD TV",
              "Wardrobe or closet",
              "Blackout drapes/curtains",
              "Television",
              "Minibar",
              "Bedsheets provided",
              "Desk",
              "Pillow menu",
              "In-room safe (laptop compatible)",
              "Free cribs/infant beds",
              "Bathrobes",
              "Iron/ironing board (on request)",
              "Electric kettle",
              "Hair dryer",
              "Turndown service",
              "Coffee/tea maker",
              "Room service (limited hours)",
              "Phone",
              "Rollaway/extra beds (surcharge)",
              "Free toiletries"
          ],
          "price_type": "single",
          "max_cash_payment": 2855.49,
          "coverted_max_cash_payment": 3929.5,
          "points": 98225,
          "bonuses": 0,
          "bonus_programs": [],
          "bonus_tiers": [],
          "lowest_price": 2855.49,
          "price": 3929.5,
          "converted_price": 3929.5,
          "lowest_converted_price": 3929.5,
          "chargeableRate": 2855.49,
          "market_rates": [],
          "base_rate": 2439.09,
          "included_taxes_and_fees_total": 416.4,
          "excluded_taxes_and_fees_total": 0,
          "excluded_taxes_and_fees_total_in_currency": 0,
          "included_taxes_and_fees": [
              {
                  "id": "tax_and_service_fee",
                  "amount": 416.4
              }
          ]
      },
      {
          "key": "er-D4BA4388A2DE0E55F420A507ADAC2D99-C435D677D4FB49E90D83A5C8D6CBB59C",
          "roomDescription": "Taste the Good Life Package - Premier Courtyard Room (incl $200 SGD dining credit)",
          "roomNormalizedDescription": "Taste The Good Life Package   Premier Courtyard Room (Incl $200 Sgd Dining Credit)",
          "type": "316153932",
          "free_cancellation": false,
          "roomAdditionalInfo": {
              "breakfastInfo": "hotel_detail_room_only",
              "displayFields": {
                  "special_check_in_instructions": null,
                  "check_in_instructions": null,
                  "know_before_you_go": null,
                  "fees_optional": null,
                  "fees_mandatory": null,
                  "kaligo_service_fee": 368.06,
                  "hotel_fees": [],
                  "surcharges": [
                      {
                          "type": "TaxAndServiceFee",
                          "amount": 441.84
                      }
                  ]
              }
          },
          "description": "Taste the Good Life Package - Premier Courtyard Room (incl $200 SGD dining credit)",
          "long_description": "<p><strong>1 King Bed</strong></p><p>452-sq-foot room with courtyard views </p><br/><p><b>Entertainment</b> - 55-inch LCD TV with satellite channels</p><p><b>Food & Drink</b> - Coffee/tea maker, minibar (fees may apply), electric kettle, and room service (limited hours)</p><p><b>Sleep</b> - Premium bedding, a pillow menu, blackout drapes/curtains, turndown service, and bed sheets </p><p><b>Bathroom</b> - Private bathroom, deep soaking bathtub and separate shower</p><p><b>Practical</b> - Laptop-compatible safe, laptop workspace, and phone; rollaway/extra beds and free cribs/infant beds available on request</p><p><b>Comfort</b> - Air conditioning and daily housekeeping</p><p>Non-Smoking</p>",
          "images": [
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/0c4c3ec8_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/0c4c3ec8_z.jpg",
                  "hero_image": true
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/c9ae1636_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/c9ae1636_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/b7789631_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/b7789631_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/6d67fe22_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/6d67fe22_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/7dbae3db_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/7dbae3db_z.jpg",
                  "hero_image": false
              }
          ],
          "amenities": [
              "Air conditioning",
              "Daily housekeeping",
              "Non-Smoking",
              "Wireless internet access",
              "Premium bedding",
              "Slippers",
              "Laptop-friendly workspace",
              "Separate bathtub and shower",
              "Number of beds - 2",
              "TV size measurement: inch",
              "Satellite TV service",
              "Private bathroom",
              "Towels provided",
              "Free bottled water",
              "TV size: 55",
              "Deep soaking bathtub",
              "LCD TV",
              "Wardrobe or closet",
              "Blackout drapes/curtains",
              "Television",
              "Minibar",
              "Bedsheets provided",
              "Desk",
              "Pillow menu",
              "In-room safe (laptop compatible)",
              "Free cribs/infant beds",
              "Bathrobes",
              "Iron/ironing board (on request)",
              "Electric kettle",
              "Hair dryer",
              "Turndown service",
              "Coffee/tea maker",
              "Room service (limited hours)",
              "Phone",
              "Rollaway/extra beds (surcharge)",
              "Free toiletries"
          ],
          "price_type": "single",
          "max_cash_payment": 3030.2,
          "coverted_max_cash_payment": 4169.93,
          "points": 104225,
          "bonuses": 0,
          "bonus_programs": [],
          "bonus_tiers": [],
          "lowest_price": 3030.2,
          "price": 4169.93,
          "converted_price": 4169.93,
          "lowest_converted_price": 4169.93,
          "chargeableRate": 3030.2,
          "market_rates": [],
          "base_rate": 2588.36,
          "included_taxes_and_fees_total": 441.84,
          "excluded_taxes_and_fees_total": 0,
          "excluded_taxes_and_fees_total_in_currency": 0,
          "included_taxes_and_fees": [
              {
                  "id": "tax_and_service_fee",
                  "amount": 441.84
              }
          ]
      },
      {
          "key": "er-D4BA4388A2DE0E55F420A507ADAC2D99-613EB4B24BDDF38EB27E3A3A55193D77",
          "roomDescription": "Taste the Good Life Package - Premier Courtyard Room Twin (incl $200 SGD dining credit)",
          "roomNormalizedDescription": "Taste The Good Life Package   Premier Courtyard Twin Room (Incl $200 Sgd Dining Credit)",
          "type": "320908745",
          "free_cancellation": false,
          "roomAdditionalInfo": {
              "breakfastInfo": "hotel_detail_room_only",
              "displayFields": {
                  "special_check_in_instructions": null,
                  "check_in_instructions": null,
                  "know_before_you_go": null,
                  "fees_optional": null,
                  "fees_mandatory": null,
                  "kaligo_service_fee": 368.06,
                  "hotel_fees": [],
                  "surcharges": [
                      {
                          "type": "TaxAndServiceFee",
                          "amount": 441.84
                      }
                  ]
              }
          },
          "description": "Taste the Good Life Package - Premier Courtyard Room Twin (incl $200 SGD dining credit)",
          "long_description": "<p><strong>2 Twin Beds</strong></p><p>452-sq-foot room with courtyard views </p><br/><p><b>Entertainment</b> - 55-inch LCD TV with satellite channels</p><p><b>Food & Drink</b> - Coffee/tea maker, minibar (fees may apply), electric kettle, and room service (limited hours)</p><p><b>Sleep</b> - Premium bedding, a pillow menu, blackout drapes/curtains, turndown service, and bed sheets </p><p><b>Bathroom</b> - Private bathroom, deep soaking bathtub and separate shower</p><p><b>Practical</b> - Laptop-compatible safe, laptop workspace, and phone; rollaway/extra beds and free cribs/infant beds available on request</p><p><b>Comfort</b> - Air conditioning and daily housekeeping</p><p>Non-Smoking</p>",
          "images": [
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/ce410bf1_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/ce410bf1_z.jpg",
                  "hero_image": true
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/c9ae1636_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/c9ae1636_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/b7789631_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/b7789631_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/6d67fe22_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/6d67fe22_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/7dbae3db_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/7dbae3db_z.jpg",
                  "hero_image": false
              }
          ],
          "amenities": [
              "Air conditioning",
              "Daily housekeeping",
              "Non-Smoking",
              "Wireless internet access",
              "Premium bedding",
              "Slippers",
              "Laptop-friendly workspace",
              "Separate bathtub and shower",
              "Number of beds - 2",
              "TV size measurement: inch",
              "Satellite TV service",
              "Private bathroom",
              "Towels provided",
              "Free bottled water",
              "TV size: 55",
              "Deep soaking bathtub",
              "LCD TV",
              "Wardrobe or closet",
              "Blackout drapes/curtains",
              "Television",
              "Minibar",
              "Bedsheets provided",
              "Desk",
              "Pillow menu",
              "In-room safe (laptop compatible)",
              "Free cribs/infant beds",
              "Bathrobes",
              "Iron/ironing board (on request)",
              "Electric kettle",
              "Hair dryer",
              "Turndown service",
              "Coffee/tea maker",
              "Room service (limited hours)",
              "Phone",
              "Rollaway/extra beds (surcharge)",
              "Free toiletries"
          ],
          "price_type": "single",
          "max_cash_payment": 3030.2,
          "coverted_max_cash_payment": 4169.93,
          "points": 104225,
          "bonuses": 0,
          "bonus_programs": [],
          "bonus_tiers": [],
          "lowest_price": 3030.2,
          "price": 4169.93,
          "converted_price": 4169.93,
          "lowest_converted_price": 4169.93,
          "chargeableRate": 3030.2,
          "market_rates": [],
          "base_rate": 2588.36,
          "included_taxes_and_fees_total": 441.84,
          "excluded_taxes_and_fees_total": 0,
          "excluded_taxes_and_fees_total_in_currency": 0,
          "included_taxes_and_fees": [
              {
                  "id": "tax_and_service_fee",
                  "amount": 441.84
              }
          ]
      },
      {
          "key": "er-D4BA4388A2DE0E55F420A507ADAC2D99-F3A5919756A0F5AA1FC637BD6870FCAB",
          "roomDescription": "Quay Room",
          "roomNormalizedDescription": "Quay Room",
          "type": "504902",
          "free_cancellation": false,
          "roomAdditionalInfo": {
              "breakfastInfo": "hotel_detail_breakfast_included",
              "displayFields": {
                  "special_check_in_instructions": null,
                  "check_in_instructions": null,
                  "know_before_you_go": null,
                  "fees_optional": null,
                  "fees_mandatory": null,
                  "kaligo_service_fee": 386.42,
                  "hotel_fees": [],
                  "surcharges": [
                      {
                          "type": "TaxAndServiceFee",
                          "amount": 463.84
                      }
                  ]
              }
          },
          "description": "Quay Room",
          "long_description": "<p><strong>1 King Bed</strong></p><p>388-sq-foot room with river views </p><br/><p><b>Entertainment</b> - 55-inch LCD TV with satellite channels</p><p><b>Food & Drink</b> - Coffee/tea maker, minibar (fees may apply), electric kettle, and room service (limited hours)</p><p><b>Sleep</b> - Premium bedding, a pillow menu, blackout drapes/curtains, turndown service, and bed sheets </p><p><b>Bathroom</b> - Private bathroom, deep soaking bathtub and separate shower</p><p><b>Practical</b> - Laptop-compatible safe, laptop workspace, and phone; rollaway/extra beds and free cribs/infant beds available on request</p><p><b>Comfort</b> - Air conditioning and daily housekeeping</p><p>Non-Smoking</p>",
          "images": [
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/a02c6557_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/a02c6557_z.jpg",
                  "hero_image": true
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/c9ae1636_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/c9ae1636_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/9ec333cb_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/9ec333cb_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/b7789631_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/b7789631_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/6d67fe22_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/6d67fe22_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/7dbae3db_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/7dbae3db_z.jpg",
                  "hero_image": false
              }
          ],
          "amenities": [
              "Air conditioning",
              "Daily housekeeping",
              "Non-Smoking",
              "Wireless internet access",
              "Premium bedding",
              "Slippers",
              "Laptop-friendly workspace",
              "Separate bathtub and shower",
              "Number of beds - 2",
              "TV size measurement: inch",
              "Satellite TV service",
              "Private bathroom",
              "Towels provided",
              "Free bottled water",
              "TV size: 55",
              "Deep soaking bathtub",
              "LCD TV",
              "Wardrobe or closet",
              "Blackout drapes/curtains",
              "Television",
              "Minibar",
              "Bedsheets provided",
              "Desk",
              "Pillow menu",
              "In-room safe (laptop compatible)",
              "Free cribs/infant beds",
              "Bathrobes",
              "Iron/ironing board (on request)",
              "Electric kettle",
              "Hair dryer",
              "Turndown service",
              "Coffee/tea maker",
              "Room service (limited hours)",
              "Phone",
              "Rollaway/extra beds (surcharge)",
              "Free toiletries"
          ],
          "price_type": "single",
          "max_cash_payment": 3181.2,
          "coverted_max_cash_payment": 4377.72,
          "points": 109425,
          "bonuses": 0,
          "bonus_programs": [],
          "bonus_tiers": [],
          "lowest_price": 3181.2,
          "price": 4377.72,
          "converted_price": 4377.72,
          "lowest_converted_price": 4377.72,
          "chargeableRate": 3181.2,
          "market_rates": [],
          "base_rate": 2717.36,
          "included_taxes_and_fees_total": 463.84,
          "excluded_taxes_and_fees_total": 0,
          "excluded_taxes_and_fees_total_in_currency": 0,
          "included_taxes_and_fees": [
              {
                  "id": "tax_and_service_fee",
                  "amount": 463.84
              }
          ]
      },
      {
          "key": "er-D4BA4388A2DE0E55F420A507ADAC2D99-40E99D99F2784D07DEA0DFDA60EBFC45",
          "roomDescription": "Taste the Good Life Package - Heritage Room Twin (incl $200 SGD dining credit)",
          "roomNormalizedDescription": "Taste The Good Life Package   Heritage Twin Room (Incl $200 Sgd Dining Credit)",
          "type": "320908721",
          "free_cancellation": false,
          "roomAdditionalInfo": {
              "breakfastInfo": "hotel_detail_room_only",
              "displayFields": {
                  "special_check_in_instructions": null,
                  "check_in_instructions": null,
                  "know_before_you_go": null,
                  "fees_optional": null,
                  "fees_mandatory": null,
                  "kaligo_service_fee": 393.09,
                  "hotel_fees": [],
                  "surcharges": [
                      {
                          "type": "TaxAndServiceFee",
                          "amount": 471.88
                      }
                  ]
              }
          },
          "description": "Taste the Good Life Package - Heritage Room Twin (incl $200 SGD dining credit)",
          "long_description": "<p><strong>2 Twin Beds</strong></p><p>409-sq-foot room with courtyard views </p><br/><p><b>Entertainment</b> - 55-inch LCD TV with satellite channels</p><p><b>Food & Drink</b> - Coffee/tea maker, minibar (fees may apply), electric kettle, and room service (limited hours)</p><p><b>Sleep</b> - Premium bedding, a pillow menu, blackout drapes/curtains, turndown service, and bed sheets </p><p><b>Bathroom</b> - Private bathroom, deep soaking bathtub and separate shower</p><p><b>Practical</b> - Laptop-compatible safe, laptop workspace, and phone; rollaway/extra beds and free cribs/infant beds available on request</p><p><b>Comfort</b> - Air conditioning and daily housekeeping</p><p>Non-Smoking</p>",
          "images": [
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/c9ae1636_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/c9ae1636_z.jpg",
                  "hero_image": true
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/b7789631_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/b7789631_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/640dedec_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/640dedec_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/6d67fe22_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/6d67fe22_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/7dbae3db_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/7dbae3db_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/ae7560bb_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/ae7560bb_z.jpg",
                  "hero_image": false
              }
          ],
          "amenities": [
              "Air conditioning",
              "Daily housekeeping",
              "Non-Smoking",
              "Wireless internet access",
              "Premium bedding",
              "Slippers",
              "Laptop-friendly workspace",
              "Separate bathtub and shower",
              "Number of beds - 2",
              "TV size measurement: inch",
              "Satellite TV service",
              "Private bathroom",
              "Towels provided",
              "Free bottled water",
              "TV size: 55",
              "Deep soaking bathtub",
              "LCD TV",
              "Wardrobe or closet",
              "Blackout drapes/curtains",
              "Television",
              "Minibar",
              "Bedsheets provided",
              "Desk",
              "Pillow menu",
              "In-room safe (laptop compatible)",
              "Free cribs/infant beds",
              "Bathrobes",
              "Iron/ironing board (on request)",
              "Electric kettle",
              "Hair dryer",
              "Turndown service",
              "Coffee/tea maker",
              "Room service (limited hours)",
              "Phone",
              "Rollaway/extra beds (surcharge)",
              "Free toiletries"
          ],
          "price_type": "single",
          "max_cash_payment": 3236.21,
          "coverted_max_cash_payment": 4453.42,
          "points": 111325,
          "bonuses": 0,
          "bonus_programs": [],
          "bonus_tiers": [],
          "lowest_price": 3236.21,
          "price": 4453.42,
          "converted_price": 4453.42,
          "lowest_converted_price": 4453.42,
          "chargeableRate": 3236.21,
          "market_rates": [],
          "base_rate": 2764.33,
          "included_taxes_and_fees_total": 471.88,
          "excluded_taxes_and_fees_total": 0,
          "excluded_taxes_and_fees_total_in_currency": 0,
          "included_taxes_and_fees": [
              {
                  "id": "tax_and_service_fee",
                  "amount": 471.88
              }
          ]
      },
      {
          "key": "er-D4BA4388A2DE0E55F420A507ADAC2D99-4EC6005FAB52C809B7C464B8AC6654DF",
          "roomDescription": "Taste the Good Life Package - Heritage Room (incl $200 SGD dining credit)",
          "roomNormalizedDescription": "Taste The Good Life Package   Heritage Room (Incl $200 Sgd Dining Credit)",
          "type": "316153943",
          "free_cancellation": false,
          "roomAdditionalInfo": {
              "breakfastInfo": "hotel_detail_room_only",
              "displayFields": {
                  "special_check_in_instructions": null,
                  "check_in_instructions": null,
                  "know_before_you_go": null,
                  "fees_optional": null,
                  "fees_mandatory": null,
                  "kaligo_service_fee": 393.09,
                  "hotel_fees": [],
                  "surcharges": [
                      {
                          "type": "TaxAndServiceFee",
                          "amount": 471.88
                      }
                  ]
              }
          },
          "description": "Taste the Good Life Package - Heritage Room (incl $200 SGD dining credit)",
          "long_description": "<p><strong>1 King Bed</strong></p><p>409-sq-foot room with courtyard views </p><br/><p><b>Entertainment</b> - 55-inch LCD TV with satellite channels</p><p><b>Food & Drink</b> - Coffee/tea maker, minibar (fees may apply), electric kettle, and room service (limited hours)</p><p><b>Sleep</b> - Premium bedding, a pillow menu, blackout drapes/curtains, turndown service, and bed sheets </p><p><b>Bathroom</b> - Private bathroom, deep soaking bathtub and separate shower</p><p><b>Practical</b> - Laptop-compatible safe, laptop workspace, and phone; rollaway/extra beds and free cribs/infant beds available on request</p><p><b>Comfort</b> - Air conditioning and daily housekeeping</p><p>Non-Smoking</p>",
          "images": [
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/d6fefe25_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/d6fefe25_z.jpg",
                  "hero_image": true
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/c9ae1636_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/c9ae1636_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/b7789631_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/b7789631_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/6d67fe22_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/6d67fe22_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/7dbae3db_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/7dbae3db_z.jpg",
                  "hero_image": false
              }
          ],
          "amenities": [
              "Air conditioning",
              "Daily housekeeping",
              "Non-Smoking",
              "Wireless internet access",
              "Premium bedding",
              "Slippers",
              "Laptop-friendly workspace",
              "Separate bathtub and shower",
              "Number of beds - 2",
              "TV size measurement: inch",
              "Satellite TV service",
              "Private bathroom",
              "Towels provided",
              "Free bottled water",
              "TV size: 55",
              "Deep soaking bathtub",
              "LCD TV",
              "Wardrobe or closet",
              "Blackout drapes/curtains",
              "Television",
              "Minibar",
              "Bedsheets provided",
              "Desk",
              "Pillow menu",
              "In-room safe (laptop compatible)",
              "Free cribs/infant beds",
              "Bathrobes",
              "Iron/ironing board (on request)",
              "Electric kettle",
              "Hair dryer",
              "Turndown service",
              "Coffee/tea maker",
              "Room service (limited hours)",
              "Phone",
              "Rollaway/extra beds (surcharge)",
              "Free toiletries"
          ],
          "price_type": "single",
          "max_cash_payment": 3236.21,
          "coverted_max_cash_payment": 4453.42,
          "points": 111325,
          "bonuses": 0,
          "bonus_programs": [],
          "bonus_tiers": [],
          "lowest_price": 3236.21,
          "price": 4453.42,
          "converted_price": 4453.42,
          "lowest_converted_price": 4453.42,
          "chargeableRate": 3236.21,
          "market_rates": [],
          "base_rate": 2764.33,
          "included_taxes_and_fees_total": 471.88,
          "excluded_taxes_and_fees_total": 0,
          "excluded_taxes_and_fees_total_in_currency": 0,
          "included_taxes_and_fees": [
              {
                  "id": "tax_and_service_fee",
                  "amount": 471.88
              }
          ]
      },
      {
          "key": "er-D4BA4388A2DE0E55F420A507ADAC2D99-6381289A8907A8A286ABF88F846EB6FC",
          "roomDescription": "Premier Courtyard Room King",
          "roomNormalizedDescription": "Premier Courtyard Room King",
          "type": "202115747",
          "free_cancellation": true,
          "roomAdditionalInfo": {
              "breakfastInfo": "hotel_detail_room_only",
              "displayFields": {
                  "special_check_in_instructions": null,
                  "check_in_instructions": null,
                  "know_before_you_go": null,
                  "fees_optional": null,
                  "fees_mandatory": null,
                  "kaligo_service_fee": 433.03,
                  "hotel_fees": [],
                  "surcharges": [
                      {
                          "type": "TaxAndServiceFee",
                          "amount": 519.82
                      }
                  ]
              }
          },
          "description": "Premier Courtyard Room King",
          "long_description": "<p><strong>1 King Bed</strong></p><p>452-sq-foot room with courtyard views </p><br/><p><b>Entertainment</b> - 55-inch LCD TV with satellite channels</p><p><b>Food & Drink</b> - Coffee/tea maker, minibar (fees may apply), electric kettle, and room service (limited hours)</p><p><b>Sleep</b> - Premium bedding, a pillow menu, blackout drapes/curtains, turndown service, and bed sheets </p><p><b>Bathroom</b> - Private bathroom, deep soaking bathtub and separate shower</p><p><b>Practical</b> - Laptop-compatible safe, laptop workspace, and phone; rollaway/extra beds and free cribs/infant beds available on request</p><p><b>Comfort</b> - Air conditioning and daily housekeeping</p><p>Non-Smoking</p>",
          "images": [
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/0c4c3ec8_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/0c4c3ec8_z.jpg",
                  "hero_image": true
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/c9ae1636_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/c9ae1636_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/b7789631_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/b7789631_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/6d67fe22_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/6d67fe22_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/7dbae3db_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/7dbae3db_z.jpg",
                  "hero_image": false
              }
          ],
          "amenities": [
              "Air conditioning",
              "Daily housekeeping",
              "Non-Smoking",
              "Wireless internet access",
              "Premium bedding",
              "Slippers",
              "Laptop-friendly workspace",
              "Separate bathtub and shower",
              "Number of beds - 2",
              "TV size measurement: inch",
              "Satellite TV service",
              "Private bathroom",
              "Towels provided",
              "Free bottled water",
              "TV size: 55",
              "Deep soaking bathtub",
              "LCD TV",
              "Wardrobe or closet",
              "Blackout drapes/curtains",
              "Television",
              "Minibar",
              "Bedsheets provided",
              "Desk",
              "Pillow menu",
              "In-room safe (laptop compatible)",
              "Free cribs/infant beds",
              "Bathrobes",
              "Iron/ironing board (on request)",
              "Electric kettle",
              "Hair dryer",
              "Turndown service",
              "Coffee/tea maker",
              "Room service (limited hours)",
              "Phone",
              "Rollaway/extra beds (surcharge)",
              "Free toiletries"
          ],
          "price_type": "single",
          "max_cash_payment": 3564.93,
          "coverted_max_cash_payment": 4905.78,
          "points": 122625,
          "bonuses": 0,
          "bonus_programs": [],
          "bonus_tiers": [],
          "lowest_price": 3564.93,
          "price": 4905.78,
          "converted_price": 4905.78,
          "lowest_converted_price": 4905.78,
          "chargeableRate": 3564.93,
          "market_rates": [],
          "base_rate": 3045.11,
          "included_taxes_and_fees_total": 519.82,
          "excluded_taxes_and_fees_total": 0,
          "excluded_taxes_and_fees_total_in_currency": 0,
          "included_taxes_and_fees": [
              {
                  "id": "tax_and_service_fee",
                  "amount": 519.82
              }
          ]
      },
      {
          "key": "er-D4BA4388A2DE0E55F420A507ADAC2D99-F1B3901E0EDD65FAF72ECFEFC60D92D8",
          "roomDescription": "Premier Courtyard Room Twin",
          "roomNormalizedDescription": "Premier Courtyard Twin Room",
          "type": "320753924",
          "free_cancellation": true,
          "roomAdditionalInfo": {
              "breakfastInfo": "hotel_detail_room_only",
              "displayFields": {
                  "special_check_in_instructions": null,
                  "check_in_instructions": null,
                  "know_before_you_go": null,
                  "fees_optional": null,
                  "fees_mandatory": null,
                  "kaligo_service_fee": 433.03,
                  "hotel_fees": [],
                  "surcharges": [
                      {
                          "type": "TaxAndServiceFee",
                          "amount": 519.82
                      }
                  ]
              }
          },
          "description": "Premier Courtyard Room Twin",
          "long_description": "<p><strong>2 Twin Beds</strong></p><p>452-sq-foot room with courtyard views </p><br/><p><b>Entertainment</b> - 55-inch LCD TV with satellite channels</p><p><b>Food & Drink</b> - Coffee/tea maker, minibar (fees may apply), electric kettle, and room service (limited hours)</p><p><b>Sleep</b> - Premium bedding, a pillow menu, blackout drapes/curtains, turndown service, and bed sheets </p><p><b>Bathroom</b> - Private bathroom, deep soaking bathtub and separate shower</p><p><b>Practical</b> - Laptop-compatible safe, laptop workspace, and phone; rollaway/extra beds and free cribs/infant beds available on request</p><p><b>Comfort</b> - Air conditioning and daily housekeeping</p><p>Non-Smoking</p>",
          "images": [
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/ce410bf1_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/ce410bf1_z.jpg",
                  "hero_image": true
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/c9ae1636_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/c9ae1636_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/b7789631_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/b7789631_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/6d67fe22_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/6d67fe22_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/7dbae3db_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/7dbae3db_z.jpg",
                  "hero_image": false
              }
          ],
          "amenities": [
              "Air conditioning",
              "Daily housekeeping",
              "Non-Smoking",
              "Wireless internet access",
              "Premium bedding",
              "Slippers",
              "Laptop-friendly workspace",
              "Separate bathtub and shower",
              "Number of beds - 2",
              "TV size measurement: inch",
              "Satellite TV service",
              "Private bathroom",
              "Towels provided",
              "Free bottled water",
              "TV size: 55",
              "Deep soaking bathtub",
              "LCD TV",
              "Wardrobe or closet",
              "Blackout drapes/curtains",
              "Television",
              "Minibar",
              "Bedsheets provided",
              "Desk",
              "Pillow menu",
              "In-room safe (laptop compatible)",
              "Free cribs/infant beds",
              "Bathrobes",
              "Iron/ironing board (on request)",
              "Electric kettle",
              "Hair dryer",
              "Turndown service",
              "Coffee/tea maker",
              "Room service (limited hours)",
              "Phone",
              "Rollaway/extra beds (surcharge)",
              "Free toiletries"
          ],
          "price_type": "single",
          "max_cash_payment": 3564.93,
          "coverted_max_cash_payment": 4905.78,
          "points": 122625,
          "bonuses": 0,
          "bonus_programs": [],
          "bonus_tiers": [],
          "lowest_price": 3564.93,
          "price": 4905.78,
          "converted_price": 4905.78,
          "lowest_converted_price": 4905.78,
          "chargeableRate": 3564.93,
          "market_rates": [],
          "base_rate": 3045.11,
          "included_taxes_and_fees_total": 519.82,
          "excluded_taxes_and_fees_total": 0,
          "excluded_taxes_and_fees_total_in_currency": 0,
          "included_taxes_and_fees": [
              {
                  "id": "tax_and_service_fee",
                  "amount": 519.82
              }
          ]
      },
      {
          "key": "er-D4BA4388A2DE0E55F420A507ADAC2D99-FF8067E20E361B108AE7842DDDC8254A",
          "roomDescription": "Taste the Good Life Package - Quay Room (incl $200 SGD dining credit)",
          "roomNormalizedDescription": "Taste The Good Life Package   Quay Room (Incl $200 Sgd Dining Credit)",
          "type": "316153950",
          "free_cancellation": false,
          "roomAdditionalInfo": {
              "breakfastInfo": "hotel_detail_room_only",
              "displayFields": {
                  "special_check_in_instructions": null,
                  "check_in_instructions": null,
                  "know_before_you_go": null,
                  "fees_optional": null,
                  "fees_mandatory": null,
                  "kaligo_service_fee": 437.94,
                  "hotel_fees": [],
                  "surcharges": [
                      {
                          "type": "TaxAndServiceFee",
                          "amount": 525.7
                      }
                  ]
              }
          },
          "description": "Taste the Good Life Package - Quay Room (incl $200 SGD dining credit)",
          "long_description": "<p><strong>1 King Bed</strong></p><p>388-sq-foot room with river views </p><br/><p><b>Entertainment</b> - 55-inch LCD TV with satellite channels</p><p><b>Food & Drink</b> - Coffee/tea maker, minibar (fees may apply), electric kettle, and room service (limited hours)</p><p><b>Sleep</b> - Premium bedding, a pillow menu, blackout drapes/curtains, turndown service, and bed sheets </p><p><b>Bathroom</b> - Private bathroom, deep soaking bathtub and separate shower</p><p><b>Practical</b> - Laptop-compatible safe, laptop workspace, and phone; rollaway/extra beds and free cribs/infant beds available on request</p><p><b>Comfort</b> - Air conditioning and daily housekeeping</p><p>Non-Smoking</p>",
          "images": [
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/a02c6557_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/a02c6557_z.jpg",
                  "hero_image": true
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/9ec333cb_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/9ec333cb_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/b7789631_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/b7789631_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/6d67fe22_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/6d67fe22_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/7dbae3db_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/7dbae3db_z.jpg",
                  "hero_image": false
              }
          ],
          "amenities": [
              "Air conditioning",
              "Daily housekeeping",
              "Non-Smoking",
              "Wireless internet access",
              "Premium bedding",
              "Slippers",
              "Laptop-friendly workspace",
              "Separate bathtub and shower",
              "Number of beds - 2",
              "TV size measurement: inch",
              "Satellite TV service",
              "Private bathroom",
              "Towels provided",
              "Free bottled water",
              "TV size: 55",
              "Deep soaking bathtub",
              "LCD TV",
              "Wardrobe or closet",
              "Blackout drapes/curtains",
              "Television",
              "Minibar",
              "Bedsheets provided",
              "Desk",
              "Pillow menu",
              "In-room safe (laptop compatible)",
              "Free cribs/infant beds",
              "Bathrobes",
              "Iron/ironing board (on request)",
              "Electric kettle",
              "Hair dryer",
              "Turndown service",
              "Coffee/tea maker",
              "Room service (limited hours)",
              "Phone",
              "Rollaway/extra beds (surcharge)",
              "Free toiletries"
          ],
          "price_type": "single",
          "max_cash_payment": 3605.32,
          "coverted_max_cash_payment": 4961.36,
          "points": 124025,
          "bonuses": 0,
          "bonus_programs": [],
          "bonus_tiers": [],
          "lowest_price": 3605.32,
          "price": 4961.36,
          "converted_price": 4961.36,
          "lowest_converted_price": 4961.36,
          "chargeableRate": 3605.32,
          "market_rates": [],
          "base_rate": 3079.62,
          "included_taxes_and_fees_total": 525.7,
          "excluded_taxes_and_fees_total": 0,
          "excluded_taxes_and_fees_total_in_currency": 0,
          "included_taxes_and_fees": [
              {
                  "id": "tax_and_service_fee",
                  "amount": 525.7
              }
          ]
      },
      {
          "key": "er-D4BA4388A2DE0E55F420A507ADAC2D99-CF6D2A335E15DCD93B9C5AA60DA7F691",
          "roomDescription": "Marina Bay View Room",
          "roomNormalizedDescription": "Marina Bay View Room",
          "type": "211208664",
          "free_cancellation": false,
          "roomAdditionalInfo": {
              "breakfastInfo": "hotel_detail_room_only",
              "displayFields": {
                  "special_check_in_instructions": null,
                  "check_in_instructions": null,
                  "know_before_you_go": null,
                  "fees_optional": null,
                  "fees_mandatory": null,
                  "kaligo_service_fee": 453.52,
                  "hotel_fees": [],
                  "surcharges": [
                      {
                          "type": "TaxAndServiceFee",
                          "amount": 544.52
                      }
                  ]
              }
          },
          "description": "Marina Bay View Room",
          "long_description": "<p><strong>1 King Bed</strong></p><p>388-sq-foot room with bay views </p><br/><p><b>Entertainment</b> - 55-inch LCD TV with satellite channels</p><p><b>Food & Drink</b> - Coffee/tea maker, minibar (fees may apply), electric kettle, and room service (limited hours)</p><p><b>Sleep</b> - Premium bedding, a pillow menu, blackout drapes/curtains, turndown service, and bed sheets </p><p><b>Bathroom</b> - Private bathroom, deep soaking bathtub and separate shower</p><p><b>Practical</b> - Laptop-compatible safe, laptop workspace, and phone; rollaway/extra beds and free cribs/infant beds available on request</p><p><b>Comfort</b> - Air conditioning and daily housekeeping</p><p>Non-Smoking</p>",
          "images": [
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/e64515ee_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/e64515ee_z.jpg",
                  "hero_image": true
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/cc5a47ca_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/cc5a47ca_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/c9ae1636_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/c9ae1636_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/b7789631_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/b7789631_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/6d67fe22_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/6d67fe22_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/7dbae3db_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/7dbae3db_z.jpg",
                  "hero_image": false
              }
          ],
          "amenities": [
              "Air conditioning",
              "Daily housekeeping",
              "Non-Smoking",
              "Wireless internet access",
              "Premium bedding",
              "Slippers",
              "Laptop-friendly workspace",
              "Separate bathtub and shower",
              "Number of beds - 2",
              "TV size measurement: inch",
              "Satellite TV service",
              "Private bathroom",
              "Towels provided",
              "Free bottled water",
              "TV size: 55",
              "Deep soaking bathtub",
              "LCD TV",
              "Wardrobe or closet",
              "Blackout drapes/curtains",
              "Television",
              "Minibar",
              "Bedsheets provided",
              "Desk",
              "Pillow menu",
              "In-room safe (laptop compatible)",
              "Free cribs/infant beds",
              "Bathrobes",
              "Iron/ironing board (on request)",
              "Electric kettle",
              "Hair dryer",
              "Turndown service",
              "Coffee/tea maker",
              "Room service (limited hours)",
              "Phone",
              "Rollaway/extra beds (surcharge)",
              "Free toiletries"
          ],
          "price_type": "single",
          "max_cash_payment": 3734.13,
          "coverted_max_cash_payment": 5138.62,
          "points": 128450,
          "bonuses": 0,
          "bonus_programs": [],
          "bonus_tiers": [],
          "lowest_price": 3734.13,
          "price": 5138.62,
          "converted_price": 5138.62,
          "lowest_converted_price": 5138.62,
          "chargeableRate": 3734.13,
          "market_rates": [],
          "base_rate": 3189.61,
          "included_taxes_and_fees_total": 544.52,
          "excluded_taxes_and_fees_total": 0,
          "excluded_taxes_and_fees_total_in_currency": 0,
          "included_taxes_and_fees": [
              {
                  "id": "tax_and_service_fee",
                  "amount": 544.52
              }
          ]
      },
      {
          "key": "er-D4BA4388A2DE0E55F420A507ADAC2D99-003F2D0668869678A0E50D134343E7D7",
          "roomDescription": "Heritage Room King",
          "roomNormalizedDescription": "Heritage Room King",
          "type": "504904",
          "free_cancellation": true,
          "roomAdditionalInfo": {
              "breakfastInfo": "hotel_detail_room_only",
              "displayFields": {
                  "special_check_in_instructions": null,
                  "check_in_instructions": null,
                  "know_before_you_go": null,
                  "fees_optional": null,
                  "fees_mandatory": null,
                  "kaligo_service_fee": 462.46,
                  "hotel_fees": [],
                  "surcharges": [
                      {
                          "type": "TaxAndServiceFee",
                          "amount": 555.16
                      }
                  ]
              }
          },
          "description": "Heritage Room King",
          "long_description": "<p><strong>1 King Bed</strong></p><p>409-sq-foot room with courtyard views </p><br/><p><b>Entertainment</b> - 55-inch LCD TV with satellite channels</p><p><b>Food & Drink</b> - Coffee/tea maker, minibar (fees may apply), electric kettle, and room service (limited hours)</p><p><b>Sleep</b> - Premium bedding, a pillow menu, blackout drapes/curtains, turndown service, and bed sheets </p><p><b>Bathroom</b> - Private bathroom, deep soaking bathtub and separate shower</p><p><b>Practical</b> - Laptop-compatible safe, laptop workspace, and phone; rollaway/extra beds and free cribs/infant beds available on request</p><p><b>Comfort</b> - Air conditioning and daily housekeeping</p><p>Non-Smoking</p>",
          "images": [
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/3660b659_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/3660b659_z.jpg",
                  "hero_image": true
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/d6fefe25_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/d6fefe25_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/c9ae1636_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/c9ae1636_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/b7789631_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/b7789631_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/6d67fe22_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/6d67fe22_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/7dbae3db_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/7dbae3db_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/ae7560bb_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/ae7560bb_z.jpg",
                  "hero_image": false
              }
          ],
          "amenities": [
              "Air conditioning",
              "Daily housekeeping",
              "Non-Smoking",
              "Wireless internet access",
              "Premium bedding",
              "Slippers",
              "Laptop-friendly workspace",
              "Separate bathtub and shower",
              "Number of beds - 2",
              "TV size measurement: inch",
              "Satellite TV service",
              "Private bathroom",
              "Towels provided",
              "Free bottled water",
              "TV size: 55",
              "Deep soaking bathtub",
              "LCD TV",
              "Wardrobe or closet",
              "Blackout drapes/curtains",
              "Television",
              "Minibar",
              "Bedsheets provided",
              "Desk",
              "Pillow menu",
              "In-room safe (laptop compatible)",
              "Free cribs/infant beds",
              "Bathrobes",
              "Iron/ironing board (on request)",
              "Electric kettle",
              "Hair dryer",
              "Turndown service",
              "Coffee/tea maker",
              "Room service (limited hours)",
              "Phone",
              "Rollaway/extra beds (surcharge)",
              "Free toiletries"
          ],
          "price_type": "single",
          "max_cash_payment": 3807.3,
          "coverted_max_cash_payment": 5239.31,
          "points": 130975,
          "bonuses": 0,
          "bonus_programs": [],
          "bonus_tiers": [],
          "lowest_price": 3807.3,
          "price": 5239.31,
          "converted_price": 5239.31,
          "lowest_converted_price": 5239.31,
          "chargeableRate": 3807.3,
          "market_rates": [],
          "base_rate": 3252.14,
          "included_taxes_and_fees_total": 555.16,
          "excluded_taxes_and_fees_total": 0,
          "excluded_taxes_and_fees_total_in_currency": 0,
          "included_taxes_and_fees": [
              {
                  "id": "tax_and_service_fee",
                  "amount": 555.16
              }
          ]
      },
      {
          "key": "er-D4BA4388A2DE0E55F420A507ADAC2D99-5D694CE9E1EBA4461153C9281CF72621",
          "roomDescription": "Heritage Room Twin",
          "roomNormalizedDescription": "Heritage Twin Room",
          "type": "320753953",
          "free_cancellation": true,
          "roomAdditionalInfo": {
              "breakfastInfo": "hotel_detail_room_only",
              "displayFields": {
                  "special_check_in_instructions": null,
                  "check_in_instructions": null,
                  "know_before_you_go": null,
                  "fees_optional": null,
                  "fees_mandatory": null,
                  "kaligo_service_fee": 462.46,
                  "hotel_fees": [],
                  "surcharges": [
                      {
                          "type": "TaxAndServiceFee",
                          "amount": 555.16
                      }
                  ]
              }
          },
          "description": "Heritage Room Twin",
          "long_description": "<p><strong>2 Twin Beds</strong></p><p>409-sq-foot room with courtyard views </p><br/><p><b>Entertainment</b> - 55-inch LCD TV with satellite channels</p><p><b>Food & Drink</b> - Coffee/tea maker, minibar (fees may apply), electric kettle, and room service (limited hours)</p><p><b>Sleep</b> - Premium bedding, a pillow menu, blackout drapes/curtains, turndown service, and bed sheets </p><p><b>Bathroom</b> - Private bathroom, deep soaking bathtub and separate shower</p><p><b>Practical</b> - Laptop-compatible safe, laptop workspace, and phone; rollaway/extra beds and free cribs/infant beds available on request</p><p><b>Comfort</b> - Air conditioning and daily housekeeping</p><p>Non-Smoking</p>",
          "images": [
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/640dedec_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/640dedec_z.jpg",
                  "hero_image": true
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/c9ae1636_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/c9ae1636_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/b7789631_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/b7789631_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/6d67fe22_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/6d67fe22_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/7dbae3db_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/7dbae3db_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/ae7560bb_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/ae7560bb_z.jpg",
                  "hero_image": false
              }
          ],
          "amenities": [
              "Air conditioning",
              "Daily housekeeping",
              "Non-Smoking",
              "Wireless internet access",
              "Premium bedding",
              "Slippers",
              "Laptop-friendly workspace",
              "Separate bathtub and shower",
              "Number of beds - 2",
              "TV size measurement: inch",
              "Satellite TV service",
              "Private bathroom",
              "Towels provided",
              "Free bottled water",
              "TV size: 55",
              "Deep soaking bathtub",
              "LCD TV",
              "Wardrobe or closet",
              "Blackout drapes/curtains",
              "Television",
              "Minibar",
              "Bedsheets provided",
              "Desk",
              "Pillow menu",
              "In-room safe (laptop compatible)",
              "Free cribs/infant beds",
              "Bathrobes",
              "Iron/ironing board (on request)",
              "Electric kettle",
              "Hair dryer",
              "Turndown service",
              "Coffee/tea maker",
              "Room service (limited hours)",
              "Phone",
              "Rollaway/extra beds (surcharge)",
              "Free toiletries"
          ],
          "price_type": "single",
          "max_cash_payment": 3807.3,
          "coverted_max_cash_payment": 5239.31,
          "points": 130975,
          "bonuses": 0,
          "bonus_programs": [],
          "bonus_tiers": [],
          "lowest_price": 3807.3,
          "price": 5239.31,
          "converted_price": 5239.31,
          "lowest_converted_price": 5239.31,
          "chargeableRate": 3807.3,
          "market_rates": [],
          "base_rate": 3252.14,
          "included_taxes_and_fees_total": 555.16,
          "excluded_taxes_and_fees_total": 0,
          "excluded_taxes_and_fees_total_in_currency": 0,
          "included_taxes_and_fees": [
              {
                  "id": "tax_and_service_fee",
                  "amount": 555.16
              }
          ]
      },
      {
          "key": "er-D4BA4388A2DE0E55F420A507ADAC2D99-869DE776B601D69547A284EF26327AF8",
          "roomDescription": "Premier Courtyard Room King",
          "roomNormalizedDescription": "Premier Courtyard Room King",
          "type": "202115747",
          "free_cancellation": false,
          "roomAdditionalInfo": {
              "breakfastInfo": "hotel_detail_breakfast_for_2_included",
              "displayFields": {
                  "special_check_in_instructions": null,
                  "check_in_instructions": null,
                  "know_before_you_go": null,
                  "fees_optional": null,
                  "fees_mandatory": null,
                  "kaligo_service_fee": 462.46,
                  "hotel_fees": [],
                  "surcharges": [
                      {
                          "type": "TaxAndServiceFee",
                          "amount": 555.16
                      }
                  ]
              }
          },
          "description": "Premier Courtyard Room King",
          "long_description": "<p><strong>1 King Bed</strong></p><p>452-sq-foot room with courtyard views </p><br/><p><b>Entertainment</b> - 55-inch LCD TV with satellite channels</p><p><b>Food & Drink</b> - Coffee/tea maker, minibar (fees may apply), electric kettle, and room service (limited hours)</p><p><b>Sleep</b> - Premium bedding, a pillow menu, blackout drapes/curtains, turndown service, and bed sheets </p><p><b>Bathroom</b> - Private bathroom, deep soaking bathtub and separate shower</p><p><b>Practical</b> - Laptop-compatible safe, laptop workspace, and phone; rollaway/extra beds and free cribs/infant beds available on request</p><p><b>Comfort</b> - Air conditioning and daily housekeeping</p><p>Non-Smoking</p>",
          "images": [
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/0c4c3ec8_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/0c4c3ec8_z.jpg",
                  "hero_image": true
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/c9ae1636_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/c9ae1636_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/b7789631_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/b7789631_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/6d67fe22_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/6d67fe22_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/7dbae3db_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/7dbae3db_z.jpg",
                  "hero_image": false
              }
          ],
          "amenities": [
              "Air conditioning",
              "Daily housekeeping",
              "Non-Smoking",
              "Wireless internet access",
              "Premium bedding",
              "Slippers",
              "Laptop-friendly workspace",
              "Separate bathtub and shower",
              "Number of beds - 2",
              "TV size measurement: inch",
              "Satellite TV service",
              "Private bathroom",
              "Towels provided",
              "Free bottled water",
              "TV size: 55",
              "Deep soaking bathtub",
              "LCD TV",
              "Wardrobe or closet",
              "Blackout drapes/curtains",
              "Television",
              "Minibar",
              "Bedsheets provided",
              "Desk",
              "Pillow menu",
              "In-room safe (laptop compatible)",
              "Free cribs/infant beds",
              "Bathrobes",
              "Iron/ironing board (on request)",
              "Electric kettle",
              "Hair dryer",
              "Turndown service",
              "Coffee/tea maker",
              "Room service (limited hours)",
              "Phone",
              "Rollaway/extra beds (surcharge)",
              "Free toiletries"
          ],
          "price_type": "single",
          "max_cash_payment": 3807.3,
          "coverted_max_cash_payment": 5239.31,
          "points": 130975,
          "bonuses": 0,
          "bonus_programs": [],
          "bonus_tiers": [],
          "lowest_price": 3807.3,
          "price": 5239.31,
          "converted_price": 5239.31,
          "lowest_converted_price": 5239.31,
          "chargeableRate": 3807.3,
          "market_rates": [],
          "base_rate": 3252.14,
          "included_taxes_and_fees_total": 555.16,
          "excluded_taxes_and_fees_total": 0,
          "excluded_taxes_and_fees_total_in_currency": 0,
          "included_taxes_and_fees": [
              {
                  "id": "tax_and_service_fee",
                  "amount": 555.16
              }
          ]
      },
      {
          "key": "er-D4BA4388A2DE0E55F420A507ADAC2D99-1AF15062052E5857A3B6D0EC1BEDEA40",
          "roomDescription": "Premier Courtyard Room King",
          "roomNormalizedDescription": "Premier Courtyard Room King",
          "type": "202115747",
          "free_cancellation": true,
          "roomAdditionalInfo": {
              "breakfastInfo": "hotel_detail_breakfast_included",
              "displayFields": {
                  "special_check_in_instructions": null,
                  "check_in_instructions": null,
                  "know_before_you_go": null,
                  "fees_optional": null,
                  "fees_mandatory": null,
                  "kaligo_service_fee": 462.46,
                  "hotel_fees": [],
                  "surcharges": [
                      {
                          "type": "TaxAndServiceFee",
                          "amount": 555.16
                      }
                  ]
              }
          },
          "description": "Premier Courtyard Room King",
          "long_description": "<p><strong>1 King Bed</strong></p><p>452-sq-foot room with courtyard views </p><br/><p><b>Entertainment</b> - 55-inch LCD TV with satellite channels</p><p><b>Food & Drink</b> - Coffee/tea maker, minibar (fees may apply), electric kettle, and room service (limited hours)</p><p><b>Sleep</b> - Premium bedding, a pillow menu, blackout drapes/curtains, turndown service, and bed sheets </p><p><b>Bathroom</b> - Private bathroom, deep soaking bathtub and separate shower</p><p><b>Practical</b> - Laptop-compatible safe, laptop workspace, and phone; rollaway/extra beds and free cribs/infant beds available on request</p><p><b>Comfort</b> - Air conditioning and daily housekeeping</p><p>Non-Smoking</p>",
          "images": [
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/0c4c3ec8_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/0c4c3ec8_z.jpg",
                  "hero_image": true
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/c9ae1636_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/c9ae1636_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/b7789631_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/b7789631_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/6d67fe22_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/6d67fe22_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/7dbae3db_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/7dbae3db_z.jpg",
                  "hero_image": false
              }
          ],
          "amenities": [
              "Air conditioning",
              "Daily housekeeping",
              "Non-Smoking",
              "Wireless internet access",
              "Premium bedding",
              "Slippers",
              "Laptop-friendly workspace",
              "Separate bathtub and shower",
              "Number of beds - 2",
              "TV size measurement: inch",
              "Satellite TV service",
              "Private bathroom",
              "Towels provided",
              "Free bottled water",
              "TV size: 55",
              "Deep soaking bathtub",
              "LCD TV",
              "Wardrobe or closet",
              "Blackout drapes/curtains",
              "Television",
              "Minibar",
              "Bedsheets provided",
              "Desk",
              "Pillow menu",
              "In-room safe (laptop compatible)",
              "Free cribs/infant beds",
              "Bathrobes",
              "Iron/ironing board (on request)",
              "Electric kettle",
              "Hair dryer",
              "Turndown service",
              "Coffee/tea maker",
              "Room service (limited hours)",
              "Phone",
              "Rollaway/extra beds (surcharge)",
              "Free toiletries"
          ],
          "price_type": "single",
          "max_cash_payment": 3807.3,
          "coverted_max_cash_payment": 5239.31,
          "points": 130975,
          "bonuses": 0,
          "bonus_programs": [],
          "bonus_tiers": [],
          "lowest_price": 3807.3,
          "price": 5239.31,
          "converted_price": 5239.31,
          "lowest_converted_price": 5239.31,
          "chargeableRate": 3807.3,
          "market_rates": [],
          "base_rate": 3252.14,
          "included_taxes_and_fees_total": 555.16,
          "excluded_taxes_and_fees_total": 0,
          "excluded_taxes_and_fees_total_in_currency": 0,
          "included_taxes_and_fees": [
              {
                  "id": "tax_and_service_fee",
                  "amount": 555.16
              }
          ]
      },
      {
          "key": "er-D4BA4388A2DE0E55F420A507ADAC2D99-3B4D98A9893E36434D421551E90F9FFE",
          "roomDescription": "Premier Courtyard Room Twin",
          "roomNormalizedDescription": "Premier Courtyard Twin Room",
          "type": "320753924",
          "free_cancellation": true,
          "roomAdditionalInfo": {
              "breakfastInfo": "hotel_detail_breakfast_included",
              "displayFields": {
                  "special_check_in_instructions": null,
                  "check_in_instructions": null,
                  "know_before_you_go": null,
                  "fees_optional": null,
                  "fees_mandatory": null,
                  "kaligo_service_fee": 462.46,
                  "hotel_fees": [],
                  "surcharges": [
                      {
                          "type": "TaxAndServiceFee",
                          "amount": 555.16
                      }
                  ]
              }
          },
          "description": "Premier Courtyard Room Twin",
          "long_description": "<p><strong>2 Twin Beds</strong></p><p>452-sq-foot room with courtyard views </p><br/><p><b>Entertainment</b> - 55-inch LCD TV with satellite channels</p><p><b>Food & Drink</b> - Coffee/tea maker, minibar (fees may apply), electric kettle, and room service (limited hours)</p><p><b>Sleep</b> - Premium bedding, a pillow menu, blackout drapes/curtains, turndown service, and bed sheets </p><p><b>Bathroom</b> - Private bathroom, deep soaking bathtub and separate shower</p><p><b>Practical</b> - Laptop-compatible safe, laptop workspace, and phone; rollaway/extra beds and free cribs/infant beds available on request</p><p><b>Comfort</b> - Air conditioning and daily housekeeping</p><p>Non-Smoking</p>",
          "images": [
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/ce410bf1_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/ce410bf1_z.jpg",
                  "hero_image": true
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/c9ae1636_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/c9ae1636_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/b7789631_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/b7789631_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/6d67fe22_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/6d67fe22_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/7dbae3db_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/7dbae3db_z.jpg",
                  "hero_image": false
              }
          ],
          "amenities": [
              "Air conditioning",
              "Daily housekeeping",
              "Non-Smoking",
              "Wireless internet access",
              "Premium bedding",
              "Slippers",
              "Laptop-friendly workspace",
              "Separate bathtub and shower",
              "Number of beds - 2",
              "TV size measurement: inch",
              "Satellite TV service",
              "Private bathroom",
              "Towels provided",
              "Free bottled water",
              "TV size: 55",
              "Deep soaking bathtub",
              "LCD TV",
              "Wardrobe or closet",
              "Blackout drapes/curtains",
              "Television",
              "Minibar",
              "Bedsheets provided",
              "Desk",
              "Pillow menu",
              "In-room safe (laptop compatible)",
              "Free cribs/infant beds",
              "Bathrobes",
              "Iron/ironing board (on request)",
              "Electric kettle",
              "Hair dryer",
              "Turndown service",
              "Coffee/tea maker",
              "Room service (limited hours)",
              "Phone",
              "Rollaway/extra beds (surcharge)",
              "Free toiletries"
          ],
          "price_type": "single",
          "max_cash_payment": 3807.3,
          "coverted_max_cash_payment": 5239.31,
          "points": 130975,
          "bonuses": 0,
          "bonus_programs": [],
          "bonus_tiers": [],
          "lowest_price": 3807.3,
          "price": 5239.31,
          "converted_price": 5239.31,
          "lowest_converted_price": 5239.31,
          "chargeableRate": 3807.3,
          "market_rates": [],
          "base_rate": 3252.14,
          "included_taxes_and_fees_total": 555.16,
          "excluded_taxes_and_fees_total": 0,
          "excluded_taxes_and_fees_total_in_currency": 0,
          "included_taxes_and_fees": [
              {
                  "id": "tax_and_service_fee",
                  "amount": 555.16
              }
          ]
      },
      {
          "key": "er-D4BA4388A2DE0E55F420A507ADAC2D99-9FAA2722ED78CA223EECC231D72DD307",
          "roomDescription": "Premier Courtyard Room Twin",
          "roomNormalizedDescription": "Premier Courtyard Twin Room",
          "type": "320753924",
          "free_cancellation": false,
          "roomAdditionalInfo": {
              "breakfastInfo": "hotel_detail_breakfast_for_2_included",
              "displayFields": {
                  "special_check_in_instructions": null,
                  "check_in_instructions": null,
                  "know_before_you_go": null,
                  "fees_optional": null,
                  "fees_mandatory": null,
                  "kaligo_service_fee": 462.46,
                  "hotel_fees": [],
                  "surcharges": [
                      {
                          "type": "TaxAndServiceFee",
                          "amount": 555.16
                      }
                  ]
              }
          },
          "description": "Premier Courtyard Room Twin",
          "long_description": "<p><strong>2 Twin Beds</strong></p><p>452-sq-foot room with courtyard views </p><br/><p><b>Entertainment</b> - 55-inch LCD TV with satellite channels</p><p><b>Food & Drink</b> - Coffee/tea maker, minibar (fees may apply), electric kettle, and room service (limited hours)</p><p><b>Sleep</b> - Premium bedding, a pillow menu, blackout drapes/curtains, turndown service, and bed sheets </p><p><b>Bathroom</b> - Private bathroom, deep soaking bathtub and separate shower</p><p><b>Practical</b> - Laptop-compatible safe, laptop workspace, and phone; rollaway/extra beds and free cribs/infant beds available on request</p><p><b>Comfort</b> - Air conditioning and daily housekeeping</p><p>Non-Smoking</p>",
          "images": [
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/ce410bf1_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/ce410bf1_z.jpg",
                  "hero_image": true
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/c9ae1636_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/c9ae1636_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/b7789631_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/b7789631_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/6d67fe22_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/6d67fe22_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/7dbae3db_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/7dbae3db_z.jpg",
                  "hero_image": false
              }
          ],
          "amenities": [
              "Air conditioning",
              "Daily housekeeping",
              "Non-Smoking",
              "Wireless internet access",
              "Premium bedding",
              "Slippers",
              "Laptop-friendly workspace",
              "Separate bathtub and shower",
              "Number of beds - 2",
              "TV size measurement: inch",
              "Satellite TV service",
              "Private bathroom",
              "Towels provided",
              "Free bottled water",
              "TV size: 55",
              "Deep soaking bathtub",
              "LCD TV",
              "Wardrobe or closet",
              "Blackout drapes/curtains",
              "Television",
              "Minibar",
              "Bedsheets provided",
              "Desk",
              "Pillow menu",
              "In-room safe (laptop compatible)",
              "Free cribs/infant beds",
              "Bathrobes",
              "Iron/ironing board (on request)",
              "Electric kettle",
              "Hair dryer",
              "Turndown service",
              "Coffee/tea maker",
              "Room service (limited hours)",
              "Phone",
              "Rollaway/extra beds (surcharge)",
              "Free toiletries"
          ],
          "price_type": "single",
          "max_cash_payment": 3807.3,
          "coverted_max_cash_payment": 5239.31,
          "points": 130975,
          "bonuses": 0,
          "bonus_programs": [],
          "bonus_tiers": [],
          "lowest_price": 3807.3,
          "price": 5239.31,
          "converted_price": 5239.31,
          "lowest_converted_price": 5239.31,
          "chargeableRate": 3807.3,
          "market_rates": [],
          "base_rate": 3252.14,
          "included_taxes_and_fees_total": 555.16,
          "excluded_taxes_and_fees_total": 0,
          "excluded_taxes_and_fees_total_in_currency": 0,
          "included_taxes_and_fees": [
              {
                  "id": "tax_and_service_fee",
                  "amount": 555.16
              }
          ]
      },
      {
          "key": "er-D4BA4388A2DE0E55F420A507ADAC2D99-E22C3B442A786564B304107A777DA058",
          "roomDescription": "Heritage Room King",
          "roomNormalizedDescription": "Heritage Room King",
          "type": "504904",
          "free_cancellation": true,
          "roomAdditionalInfo": {
              "breakfastInfo": "hotel_detail_breakfast_included",
              "displayFields": {
                  "special_check_in_instructions": null,
                  "check_in_instructions": null,
                  "know_before_you_go": null,
                  "fees_optional": null,
                  "fees_mandatory": null,
                  "kaligo_service_fee": 491.88,
                  "hotel_fees": [],
                  "surcharges": [
                      {
                          "type": "TaxAndServiceFee",
                          "amount": 590.52
                      }
                  ]
              }
          },
          "description": "Heritage Room King",
          "long_description": "<p><strong>1 King Bed</strong></p><p>409-sq-foot room with courtyard views </p><br/><p><b>Entertainment</b> - 55-inch LCD TV with satellite channels</p><p><b>Food & Drink</b> - Coffee/tea maker, minibar (fees may apply), electric kettle, and room service (limited hours)</p><p><b>Sleep</b> - Premium bedding, a pillow menu, blackout drapes/curtains, turndown service, and bed sheets </p><p><b>Bathroom</b> - Private bathroom, deep soaking bathtub and separate shower</p><p><b>Practical</b> - Laptop-compatible safe, laptop workspace, and phone; rollaway/extra beds and free cribs/infant beds available on request</p><p><b>Comfort</b> - Air conditioning and daily housekeeping</p><p>Non-Smoking</p>",
          "images": [
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/3660b659_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/3660b659_z.jpg",
                  "hero_image": true
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/d6fefe25_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/d6fefe25_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/c9ae1636_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/c9ae1636_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/b7789631_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/b7789631_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/6d67fe22_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/6d67fe22_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/7dbae3db_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/7dbae3db_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/ae7560bb_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/ae7560bb_z.jpg",
                  "hero_image": false
              }
          ],
          "amenities": [
              "Air conditioning",
              "Daily housekeeping",
              "Non-Smoking",
              "Wireless internet access",
              "Premium bedding",
              "Slippers",
              "Laptop-friendly workspace",
              "Separate bathtub and shower",
              "Number of beds - 2",
              "TV size measurement: inch",
              "Satellite TV service",
              "Private bathroom",
              "Towels provided",
              "Free bottled water",
              "TV size: 55",
              "Deep soaking bathtub",
              "LCD TV",
              "Wardrobe or closet",
              "Blackout drapes/curtains",
              "Television",
              "Minibar",
              "Bedsheets provided",
              "Desk",
              "Pillow menu",
              "In-room safe (laptop compatible)",
              "Free cribs/infant beds",
              "Bathrobes",
              "Iron/ironing board (on request)",
              "Electric kettle",
              "Hair dryer",
              "Turndown service",
              "Coffee/tea maker",
              "Room service (limited hours)",
              "Phone",
              "Rollaway/extra beds (surcharge)",
              "Free toiletries"
          ],
          "price_type": "single",
          "max_cash_payment": 4049.68,
          "coverted_max_cash_payment": 5572.86,
          "points": 139300,
          "bonuses": 0,
          "bonus_programs": [],
          "bonus_tiers": [],
          "lowest_price": 4049.68,
          "price": 5572.86,
          "converted_price": 5572.86,
          "lowest_converted_price": 5572.86,
          "chargeableRate": 4049.68,
          "market_rates": [],
          "base_rate": 3459.16,
          "included_taxes_and_fees_total": 590.52,
          "excluded_taxes_and_fees_total": 0,
          "excluded_taxes_and_fees_total_in_currency": 0,
          "included_taxes_and_fees": [
              {
                  "id": "tax_and_service_fee",
                  "amount": 590.52
              }
          ]
      },
      {
          "key": "er-D4BA4388A2DE0E55F420A507ADAC2D99-7AE8077D61346F5018EA0A424B90550D",
          "roomDescription": "Heritage Room King",
          "roomNormalizedDescription": "Heritage Room King",
          "type": "504904",
          "free_cancellation": false,
          "roomAdditionalInfo": {
              "breakfastInfo": "hotel_detail_breakfast_for_2_included",
              "displayFields": {
                  "special_check_in_instructions": null,
                  "check_in_instructions": null,
                  "know_before_you_go": null,
                  "fees_optional": null,
                  "fees_mandatory": null,
                  "kaligo_service_fee": 491.88,
                  "hotel_fees": [],
                  "surcharges": [
                      {
                          "type": "TaxAndServiceFee",
                          "amount": 590.52
                      }
                  ]
              }
          },
          "description": "Heritage Room King",
          "long_description": "<p><strong>1 King Bed</strong></p><p>409-sq-foot room with courtyard views </p><br/><p><b>Entertainment</b> - 55-inch LCD TV with satellite channels</p><p><b>Food & Drink</b> - Coffee/tea maker, minibar (fees may apply), electric kettle, and room service (limited hours)</p><p><b>Sleep</b> - Premium bedding, a pillow menu, blackout drapes/curtains, turndown service, and bed sheets </p><p><b>Bathroom</b> - Private bathroom, deep soaking bathtub and separate shower</p><p><b>Practical</b> - Laptop-compatible safe, laptop workspace, and phone; rollaway/extra beds and free cribs/infant beds available on request</p><p><b>Comfort</b> - Air conditioning and daily housekeeping</p><p>Non-Smoking</p>",
          "images": [
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/3660b659_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/3660b659_z.jpg",
                  "hero_image": true
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/d6fefe25_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/d6fefe25_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/c9ae1636_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/c9ae1636_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/b7789631_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/b7789631_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/6d67fe22_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/6d67fe22_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/7dbae3db_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/7dbae3db_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/ae7560bb_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/ae7560bb_z.jpg",
                  "hero_image": false
              }
          ],
          "amenities": [
              "Air conditioning",
              "Daily housekeeping",
              "Non-Smoking",
              "Wireless internet access",
              "Premium bedding",
              "Slippers",
              "Laptop-friendly workspace",
              "Separate bathtub and shower",
              "Number of beds - 2",
              "TV size measurement: inch",
              "Satellite TV service",
              "Private bathroom",
              "Towels provided",
              "Free bottled water",
              "TV size: 55",
              "Deep soaking bathtub",
              "LCD TV",
              "Wardrobe or closet",
              "Blackout drapes/curtains",
              "Television",
              "Minibar",
              "Bedsheets provided",
              "Desk",
              "Pillow menu",
              "In-room safe (laptop compatible)",
              "Free cribs/infant beds",
              "Bathrobes",
              "Iron/ironing board (on request)",
              "Electric kettle",
              "Hair dryer",
              "Turndown service",
              "Coffee/tea maker",
              "Room service (limited hours)",
              "Phone",
              "Rollaway/extra beds (surcharge)",
              "Free toiletries"
          ],
          "price_type": "single",
          "max_cash_payment": 4049.68,
          "coverted_max_cash_payment": 5572.86,
          "points": 139300,
          "bonuses": 0,
          "bonus_programs": [],
          "bonus_tiers": [],
          "lowest_price": 4049.68,
          "price": 5572.86,
          "converted_price": 5572.86,
          "lowest_converted_price": 5572.86,
          "chargeableRate": 4049.68,
          "market_rates": [],
          "base_rate": 3459.16,
          "included_taxes_and_fees_total": 590.52,
          "excluded_taxes_and_fees_total": 0,
          "excluded_taxes_and_fees_total_in_currency": 0,
          "included_taxes_and_fees": [
              {
                  "id": "tax_and_service_fee",
                  "amount": 590.52
              }
          ]
      },
      {
          "key": "er-D4BA4388A2DE0E55F420A507ADAC2D99-A6B3C921B0344C9D75C7D65EB67756F9",
          "roomDescription": "Heritage Room Twin",
          "roomNormalizedDescription": "Heritage Twin Room",
          "type": "320753953",
          "free_cancellation": false,
          "roomAdditionalInfo": {
              "breakfastInfo": "hotel_detail_breakfast_for_2_included",
              "displayFields": {
                  "special_check_in_instructions": null,
                  "check_in_instructions": null,
                  "know_before_you_go": null,
                  "fees_optional": null,
                  "fees_mandatory": null,
                  "kaligo_service_fee": 491.88,
                  "hotel_fees": [],
                  "surcharges": [
                      {
                          "type": "TaxAndServiceFee",
                          "amount": 590.52
                      }
                  ]
              }
          },
          "description": "Heritage Room Twin",
          "long_description": "<p><strong>2 Twin Beds</strong></p><p>409-sq-foot room with courtyard views </p><br/><p><b>Entertainment</b> - 55-inch LCD TV with satellite channels</p><p><b>Food & Drink</b> - Coffee/tea maker, minibar (fees may apply), electric kettle, and room service (limited hours)</p><p><b>Sleep</b> - Premium bedding, a pillow menu, blackout drapes/curtains, turndown service, and bed sheets </p><p><b>Bathroom</b> - Private bathroom, deep soaking bathtub and separate shower</p><p><b>Practical</b> - Laptop-compatible safe, laptop workspace, and phone; rollaway/extra beds and free cribs/infant beds available on request</p><p><b>Comfort</b> - Air conditioning and daily housekeeping</p><p>Non-Smoking</p>",
          "images": [
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/640dedec_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/640dedec_z.jpg",
                  "hero_image": true
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/c9ae1636_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/c9ae1636_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/b7789631_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/b7789631_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/6d67fe22_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/6d67fe22_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/7dbae3db_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/7dbae3db_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/ae7560bb_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/ae7560bb_z.jpg",
                  "hero_image": false
              }
          ],
          "amenities": [
              "Air conditioning",
              "Daily housekeeping",
              "Non-Smoking",
              "Wireless internet access",
              "Premium bedding",
              "Slippers",
              "Laptop-friendly workspace",
              "Separate bathtub and shower",
              "Number of beds - 2",
              "TV size measurement: inch",
              "Satellite TV service",
              "Private bathroom",
              "Towels provided",
              "Free bottled water",
              "TV size: 55",
              "Deep soaking bathtub",
              "LCD TV",
              "Wardrobe or closet",
              "Blackout drapes/curtains",
              "Television",
              "Minibar",
              "Bedsheets provided",
              "Desk",
              "Pillow menu",
              "In-room safe (laptop compatible)",
              "Free cribs/infant beds",
              "Bathrobes",
              "Iron/ironing board (on request)",
              "Electric kettle",
              "Hair dryer",
              "Turndown service",
              "Coffee/tea maker",
              "Room service (limited hours)",
              "Phone",
              "Rollaway/extra beds (surcharge)",
              "Free toiletries"
          ],
          "price_type": "single",
          "max_cash_payment": 4049.68,
          "coverted_max_cash_payment": 5572.86,
          "points": 139300,
          "bonuses": 0,
          "bonus_programs": [],
          "bonus_tiers": [],
          "lowest_price": 4049.68,
          "price": 5572.86,
          "converted_price": 5572.86,
          "lowest_converted_price": 5572.86,
          "chargeableRate": 4049.68,
          "market_rates": [],
          "base_rate": 3459.16,
          "included_taxes_and_fees_total": 590.52,
          "excluded_taxes_and_fees_total": 0,
          "excluded_taxes_and_fees_total_in_currency": 0,
          "included_taxes_and_fees": [
              {
                  "id": "tax_and_service_fee",
                  "amount": 590.52
              }
          ]
      },
      {
          "key": "er-D4BA4388A2DE0E55F420A507ADAC2D99-81DABF9E561EC7D14999DE5F6D0EF994",
          "roomDescription": "Heritage Room Twin",
          "roomNormalizedDescription": "Heritage Twin Room",
          "type": "320753953",
          "free_cancellation": true,
          "roomAdditionalInfo": {
              "breakfastInfo": "hotel_detail_breakfast_included",
              "displayFields": {
                  "special_check_in_instructions": null,
                  "check_in_instructions": null,
                  "know_before_you_go": null,
                  "fees_optional": null,
                  "fees_mandatory": null,
                  "kaligo_service_fee": 491.88,
                  "hotel_fees": [],
                  "surcharges": [
                      {
                          "type": "TaxAndServiceFee",
                          "amount": 590.52
                      }
                  ]
              }
          },
          "description": "Heritage Room Twin",
          "long_description": "<p><strong>2 Twin Beds</strong></p><p>409-sq-foot room with courtyard views </p><br/><p><b>Entertainment</b> - 55-inch LCD TV with satellite channels</p><p><b>Food & Drink</b> - Coffee/tea maker, minibar (fees may apply), electric kettle, and room service (limited hours)</p><p><b>Sleep</b> - Premium bedding, a pillow menu, blackout drapes/curtains, turndown service, and bed sheets </p><p><b>Bathroom</b> - Private bathroom, deep soaking bathtub and separate shower</p><p><b>Practical</b> - Laptop-compatible safe, laptop workspace, and phone; rollaway/extra beds and free cribs/infant beds available on request</p><p><b>Comfort</b> - Air conditioning and daily housekeeping</p><p>Non-Smoking</p>",
          "images": [
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/640dedec_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/640dedec_z.jpg",
                  "hero_image": true
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/c9ae1636_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/c9ae1636_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/b7789631_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/b7789631_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/6d67fe22_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/6d67fe22_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/7dbae3db_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/7dbae3db_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/ae7560bb_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/ae7560bb_z.jpg",
                  "hero_image": false
              }
          ],
          "amenities": [
              "Air conditioning",
              "Daily housekeeping",
              "Non-Smoking",
              "Wireless internet access",
              "Premium bedding",
              "Slippers",
              "Laptop-friendly workspace",
              "Separate bathtub and shower",
              "Number of beds - 2",
              "TV size measurement: inch",
              "Satellite TV service",
              "Private bathroom",
              "Towels provided",
              "Free bottled water",
              "TV size: 55",
              "Deep soaking bathtub",
              "LCD TV",
              "Wardrobe or closet",
              "Blackout drapes/curtains",
              "Television",
              "Minibar",
              "Bedsheets provided",
              "Desk",
              "Pillow menu",
              "In-room safe (laptop compatible)",
              "Free cribs/infant beds",
              "Bathrobes",
              "Iron/ironing board (on request)",
              "Electric kettle",
              "Hair dryer",
              "Turndown service",
              "Coffee/tea maker",
              "Room service (limited hours)",
              "Phone",
              "Rollaway/extra beds (surcharge)",
              "Free toiletries"
          ],
          "price_type": "single",
          "max_cash_payment": 4049.68,
          "coverted_max_cash_payment": 5572.86,
          "points": 139300,
          "bonuses": 0,
          "bonus_programs": [],
          "bonus_tiers": [],
          "lowest_price": 4049.68,
          "price": 5572.86,
          "converted_price": 5572.86,
          "lowest_converted_price": 5572.86,
          "chargeableRate": 4049.68,
          "market_rates": [],
          "base_rate": 3459.16,
          "included_taxes_and_fees_total": 590.52,
          "excluded_taxes_and_fees_total": 0,
          "excluded_taxes_and_fees_total_in_currency": 0,
          "included_taxes_and_fees": [
              {
                  "id": "tax_and_service_fee",
                  "amount": 590.52
              }
          ]
      },
      {
          "key": "er-D4BA4388A2DE0E55F420A507ADAC2D99-23780C2EA270603BCA9060A2101EF9D8",
          "roomDescription": "Taste the Good Life Package - Marina Bay View Room (incl $200 SGD dining credit)",
          "roomNormalizedDescription": "Taste The Good Life Package   Marina Bay View Room (Incl $200 Sgd Dining Credit)",
          "type": "324569422",
          "free_cancellation": false,
          "roomAdditionalInfo": {
              "breakfastInfo": "hotel_detail_room_only",
              "displayFields": {
                  "special_check_in_instructions": null,
                  "check_in_instructions": null,
                  "know_before_you_go": null,
                  "fees_optional": null,
                  "fees_mandatory": null,
                  "kaligo_service_fee": 514.05,
                  "hotel_fees": [],
                  "surcharges": [
                      {
                          "type": "TaxAndServiceFee",
                          "amount": 617.09
                      }
                  ]
              }
          },
          "description": "Taste the Good Life Package - Marina Bay View Room (incl $200 SGD dining credit)",
          "long_description": "<p><strong>1 King Bed</strong></p><p>388-sq-foot room with city views </p><br/><p><b>Entertainment</b> - 55-inch LCD TV with satellite channels</p><p><b>Food & Drink</b> - Coffee/tea maker, minibar (fees may apply), electric kettle, and room service (limited hours)</p><p><b>Sleep</b> - Premium bedding, a pillow menu, blackout drapes/curtains, turndown service, and bed sheets </p><p><b>Bathroom</b> - Private bathroom, deep soaking bathtub and separate shower</p><p><b>Practical</b> - Laptop-compatible safe, laptop workspace, and phone; rollaway/extra beds and free cribs/infant beds available on request</p><p><b>Comfort</b> - Air conditioning and daily housekeeping</p><p>Non-Smoking</p>",
          "images": [
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/e64515ee_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/e64515ee_z.jpg",
                  "hero_image": true
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/cc5a47ca_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/cc5a47ca_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/c9ae1636_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/c9ae1636_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/b7789631_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/b7789631_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/6d67fe22_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/6d67fe22_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/7dbae3db_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/7dbae3db_z.jpg",
                  "hero_image": false
              }
          ],
          "amenities": [
              "Air conditioning",
              "Daily housekeeping",
              "Non-Smoking",
              "Wireless internet access",
              "Premium bedding",
              "Slippers",
              "Laptop-friendly workspace",
              "Separate bathtub and shower",
              "Number of beds - 2",
              "TV size measurement: inch",
              "Satellite TV service",
              "Private bathroom",
              "Towels provided",
              "Free bottled water",
              "TV size: 55",
              "Deep soaking bathtub",
              "LCD TV",
              "Wardrobe or closet",
              "Blackout drapes/curtains",
              "Television",
              "Minibar",
              "Bedsheets provided",
              "Desk",
              "Pillow menu",
              "In-room safe (laptop compatible)",
              "Free cribs/infant beds",
              "Bathrobes",
              "Iron/ironing board (on request)",
              "Electric kettle",
              "Hair dryer",
              "Turndown service",
              "Coffee/tea maker",
              "Room service (limited hours)",
              "Phone",
              "Rollaway/extra beds (surcharge)",
              "Free toiletries"
          ],
          "price_type": "single",
          "max_cash_payment": 4231.99,
          "coverted_max_cash_payment": 5823.74,
          "points": 145575,
          "bonuses": 0,
          "bonus_programs": [],
          "bonus_tiers": [],
          "lowest_price": 4231.99,
          "price": 5823.74,
          "converted_price": 5823.74,
          "lowest_converted_price": 5823.74,
          "chargeableRate": 4231.99,
          "market_rates": [],
          "base_rate": 3614.9,
          "included_taxes_and_fees_total": 617.09,
          "excluded_taxes_and_fees_total": 0,
          "excluded_taxes_and_fees_total_in_currency": 0,
          "included_taxes_and_fees": [
              {
                  "id": "tax_and_service_fee",
                  "amount": 617.09
              }
          ]
      },
      {
          "key": "er-D4BA4388A2DE0E55F420A507ADAC2D99-4743223433C99524B224494323DBFEB0",
          "roomDescription": "Quay Room",
          "roomNormalizedDescription": "Quay Room",
          "type": "504902",
          "free_cancellation": true,
          "roomAdditionalInfo": {
              "breakfastInfo": "hotel_detail_room_only",
              "displayFields": {
                  "special_check_in_instructions": null,
                  "check_in_instructions": null,
                  "know_before_you_go": null,
                  "fees_optional": null,
                  "fees_mandatory": null,
                  "kaligo_service_fee": 515.19,
                  "hotel_fees": [],
                  "surcharges": [
                      {
                          "type": "TaxAndServiceFee",
                          "amount": 618.5
                      }
                  ]
              }
          },
          "description": "Quay Room",
          "long_description": "<p><strong>1 King Bed</strong></p><p>388-sq-foot room with river views </p><br/><p><b>Entertainment</b> - 55-inch LCD TV with satellite channels</p><p><b>Food & Drink</b> - Coffee/tea maker, minibar (fees may apply), electric kettle, and room service (limited hours)</p><p><b>Sleep</b> - Premium bedding, a pillow menu, blackout drapes/curtains, turndown service, and bed sheets </p><p><b>Bathroom</b> - Private bathroom, deep soaking bathtub and separate shower</p><p><b>Practical</b> - Laptop-compatible safe, laptop workspace, and phone; rollaway/extra beds and free cribs/infant beds available on request</p><p><b>Comfort</b> - Air conditioning and daily housekeeping</p><p>Non-Smoking</p>",
          "images": [
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/a02c6557_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/a02c6557_z.jpg",
                  "hero_image": true
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/c9ae1636_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/c9ae1636_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/9ec333cb_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/9ec333cb_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/b7789631_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/b7789631_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/6d67fe22_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/6d67fe22_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/7dbae3db_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/7dbae3db_z.jpg",
                  "hero_image": false
              }
          ],
          "amenities": [
              "Air conditioning",
              "Daily housekeeping",
              "Non-Smoking",
              "Wireless internet access",
              "Premium bedding",
              "Slippers",
              "Laptop-friendly workspace",
              "Separate bathtub and shower",
              "Number of beds - 2",
              "TV size measurement: inch",
              "Satellite TV service",
              "Private bathroom",
              "Towels provided",
              "Free bottled water",
              "TV size: 55",
              "Deep soaking bathtub",
              "LCD TV",
              "Wardrobe or closet",
              "Blackout drapes/curtains",
              "Television",
              "Minibar",
              "Bedsheets provided",
              "Desk",
              "Pillow menu",
              "In-room safe (laptop compatible)",
              "Free cribs/infant beds",
              "Bathrobes",
              "Iron/ironing board (on request)",
              "Electric kettle",
              "Hair dryer",
              "Turndown service",
              "Coffee/tea maker",
              "Room service (limited hours)",
              "Phone",
              "Rollaway/extra beds (surcharge)",
              "Free toiletries"
          ],
          "price_type": "single",
          "max_cash_payment": 4241.57,
          "coverted_max_cash_payment": 5836.92,
          "points": 145900,
          "bonuses": 0,
          "bonus_programs": [],
          "bonus_tiers": [],
          "lowest_price": 4241.57,
          "price": 5836.92,
          "converted_price": 5836.92,
          "lowest_converted_price": 5836.92,
          "chargeableRate": 4241.57,
          "market_rates": [],
          "base_rate": 3623.07,
          "included_taxes_and_fees_total": 618.5,
          "excluded_taxes_and_fees_total": 0,
          "excluded_taxes_and_fees_total_in_currency": 0,
          "included_taxes_and_fees": [
              {
                  "id": "tax_and_service_fee",
                  "amount": 618.5
              }
          ]
      },
      {
          "key": "er-D4BA4388A2DE0E55F420A507ADAC2D99-66074BE3407D2D9B7628810067F14A8F",
          "roomDescription": "Straits Club Courtyard Room",
          "roomNormalizedDescription": "Straits Club Courtyard Room",
          "type": "200007724",
          "free_cancellation": true,
          "roomAdditionalInfo": {
              "breakfastInfo": "hotel_detail_breakfast_included",
              "displayFields": {
                  "special_check_in_instructions": null,
                  "check_in_instructions": null,
                  "know_before_you_go": null,
                  "fees_optional": null,
                  "fees_mandatory": null,
                  "kaligo_service_fee": 530.85,
                  "hotel_fees": [],
                  "surcharges": [
                      {
                          "type": "TaxAndServiceFee",
                          "amount": 637.25
                      }
                  ]
              }
          },
          "description": "Straits Club Courtyard Room",
          "long_description": "<p><strong>1 King Bed</strong></p><p>452-sq-foot room with courtyard views </p><br/><p><b>Club/Executive Level</b> - Club Lounge access, light refreshments, internet access in the lounge, and separate check-in location</p><p><b>Entertainment</b> - 55-inch LCD TV with satellite channels</p><p><b>Food & Drink</b> - Coffee/tea maker, minibar (fees may apply), electric kettle, and room service (limited hours)</p><p><b>Sleep</b> - Premium bedding, a pillow menu, blackout drapes/curtains, turndown service, and bed sheets </p><p><b>Bathroom</b> - Private bathroom, deep soaking bathtub and separate shower</p><p><b>Practical</b> - Laptop-compatible safe, laptop workspace, and phone; rollaway/extra beds and free cribs/infant beds available on request</p><p><b>Comfort</b> - Air conditioning and daily housekeeping</p><p>Non-Smoking</p>",
          "images": [
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/5086872a_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/5086872a_z.jpg",
                  "hero_image": true
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/b7789631_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/b7789631_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/6d67fe22_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/6d67fe22_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/f774cf64_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/f774cf64_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/7f4ebfe7_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/7f4ebfe7_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/cb65b89e_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/cb65b89e_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/4962f2ee_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/4962f2ee_z.jpg",
                  "hero_image": false
              }
          ],
          "amenities": [
              "Air conditioning",
              "Daily housekeeping",
              "Non-Smoking",
              "Wireless internet access",
              "Premium bedding",
              "Slippers",
              "Laptop-friendly workspace",
              "Separate bathtub and shower",
              "Number of beds - 2",
              "TV size measurement: inch",
              "Satellite TV service",
              "Private bathroom",
              "Towels provided",
              "Free bottled water",
              "TV size: 55",
              "Deep soaking bathtub",
              "LCD TV",
              "Wardrobe or closet",
              "Blackout drapes/curtains",
              "Television",
              "Minibar",
              "Bedsheets provided",
              "Desk",
              "Pillow menu",
              "In-room safe (laptop compatible)",
              "Free cribs/infant beds",
              "Bathrobes",
              "Iron/ironing board (on request)",
              "Electric kettle",
              "Hair dryer",
              "Turndown service",
              "Coffee/tea maker",
              "Room service (limited hours)",
              "Phone",
              "Rollaway/extra beds (surcharge)",
              "Free toiletries"
          ],
          "price_type": "single",
          "max_cash_payment": 4370.33,
          "coverted_max_cash_payment": 6014.11,
          "points": 150350,
          "bonuses": 0,
          "bonus_programs": [],
          "bonus_tiers": [],
          "lowest_price": 4370.33,
          "price": 6014.11,
          "converted_price": 6014.11,
          "lowest_converted_price": 6014.11,
          "chargeableRate": 4370.33,
          "market_rates": [],
          "base_rate": 3733.08,
          "included_taxes_and_fees_total": 637.25,
          "excluded_taxes_and_fees_total": 0,
          "excluded_taxes_and_fees_total_in_currency": 0,
          "included_taxes_and_fees": [
              {
                  "id": "tax_and_service_fee",
                  "amount": 637.25
              }
          ]
      },
      {
          "key": "er-D4BA4388A2DE0E55F420A507ADAC2D99-E12BBC9150FD832B640FD7AD076FCC29",
          "roomDescription": "Quay Room",
          "roomNormalizedDescription": "Quay Room",
          "type": "504902",
          "free_cancellation": true,
          "roomAdditionalInfo": {
              "breakfastInfo": "hotel_detail_breakfast_included",
              "displayFields": {
                  "special_check_in_instructions": null,
                  "check_in_instructions": null,
                  "know_before_you_go": null,
                  "fees_optional": null,
                  "fees_mandatory": null,
                  "kaligo_service_fee": 537.28,
                  "hotel_fees": [],
                  "surcharges": [
                      {
                          "type": "TaxAndServiceFee",
                          "amount": 644.98
                      }
                  ]
              }
          },
          "description": "Quay Room",
          "long_description": "<p><strong>1 King Bed</strong></p><p>388-sq-foot room with river views </p><br/><p><b>Entertainment</b> - 55-inch LCD TV with satellite channels</p><p><b>Food & Drink</b> - Coffee/tea maker, minibar (fees may apply), electric kettle, and room service (limited hours)</p><p><b>Sleep</b> - Premium bedding, a pillow menu, blackout drapes/curtains, turndown service, and bed sheets </p><p><b>Bathroom</b> - Private bathroom, deep soaking bathtub and separate shower</p><p><b>Practical</b> - Laptop-compatible safe, laptop workspace, and phone; rollaway/extra beds and free cribs/infant beds available on request</p><p><b>Comfort</b> - Air conditioning and daily housekeeping</p><p>Non-Smoking</p>",
          "images": [
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/a02c6557_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/a02c6557_z.jpg",
                  "hero_image": true
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/c9ae1636_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/c9ae1636_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/9ec333cb_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/9ec333cb_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/b7789631_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/b7789631_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/6d67fe22_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/6d67fe22_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/7dbae3db_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/7dbae3db_z.jpg",
                  "hero_image": false
              }
          ],
          "amenities": [
              "Air conditioning",
              "Daily housekeeping",
              "Non-Smoking",
              "Wireless internet access",
              "Premium bedding",
              "Slippers",
              "Laptop-friendly workspace",
              "Separate bathtub and shower",
              "Number of beds - 2",
              "TV size measurement: inch",
              "Satellite TV service",
              "Private bathroom",
              "Towels provided",
              "Free bottled water",
              "TV size: 55",
              "Deep soaking bathtub",
              "LCD TV",
              "Wardrobe or closet",
              "Blackout drapes/curtains",
              "Television",
              "Minibar",
              "Bedsheets provided",
              "Desk",
              "Pillow menu",
              "In-room safe (laptop compatible)",
              "Free cribs/infant beds",
              "Bathrobes",
              "Iron/ironing board (on request)",
              "Electric kettle",
              "Hair dryer",
              "Turndown service",
              "Coffee/tea maker",
              "Room service (limited hours)",
              "Phone",
              "Rollaway/extra beds (surcharge)",
              "Free toiletries"
          ],
          "price_type": "single",
          "max_cash_payment": 4423.34,
          "coverted_max_cash_payment": 6087.06,
          "points": 152175,
          "bonuses": 0,
          "bonus_programs": [],
          "bonus_tiers": [],
          "lowest_price": 4423.34,
          "price": 6087.06,
          "converted_price": 6087.06,
          "lowest_converted_price": 6087.06,
          "chargeableRate": 4423.34,
          "market_rates": [],
          "base_rate": 3778.36,
          "included_taxes_and_fees_total": 644.98,
          "excluded_taxes_and_fees_total": 0,
          "excluded_taxes_and_fees_total_in_currency": 0,
          "included_taxes_and_fees": [
              {
                  "id": "tax_and_service_fee",
                  "amount": 644.98
              }
          ]
      },
      {
          "key": "er-D4BA4388A2DE0E55F420A507ADAC2D99-FA3E3E69B352D24771902AF56C61F800",
          "roomDescription": "Straits Club Heritage Room",
          "roomNormalizedDescription": "Straits Club Heritage Room",
          "type": "201113100",
          "free_cancellation": true,
          "roomAdditionalInfo": {
              "breakfastInfo": "hotel_detail_breakfast_included",
              "displayFields": {
                  "special_check_in_instructions": null,
                  "check_in_instructions": null,
                  "know_before_you_go": null,
                  "fees_optional": null,
                  "fees_mandatory": null,
                  "kaligo_service_fee": 552.94,
                  "hotel_fees": [],
                  "surcharges": [
                      {
                          "type": "TaxAndServiceFee",
                          "amount": 663.74
                      }
                  ]
              }
          },
          "description": "Straits Club Heritage Room",
          "long_description": "<p><strong>1 King Bed</strong></p><p>409-sq-foot room with courtyard views </p><br/><p><b>Club/Executive Level</b> - Club Lounge access, light refreshments, internet access in the lounge, and separate check-in location</p><p><b>Entertainment</b> - 55-inch LCD TV with satellite channels</p><p><b>Food & Drink</b> - Coffee/tea maker, minibar (fees may apply), electric kettle, and room service (limited hours)</p><p><b>Sleep</b> - Premium bedding, a pillow menu, blackout drapes/curtains, turndown service, and bed sheets </p><p><b>Bathroom</b> - Private bathroom, deep soaking bathtub and separate shower</p><p><b>Practical</b> - Laptop-compatible safe, laptop workspace, and phone; rollaway/extra beds and free cribs/infant beds available on request</p><p><b>Comfort</b> - Air conditioning and daily housekeeping</p><p>Non-Smoking</p>",
          "images": [
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/18955846_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/18955846_z.jpg",
                  "hero_image": true
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/b7789631_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/b7789631_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/6d67fe22_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/6d67fe22_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/f774cf64_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/f774cf64_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/7f4ebfe7_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/7f4ebfe7_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/cb65b89e_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/cb65b89e_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/4962f2ee_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/4962f2ee_z.jpg",
                  "hero_image": false
              }
          ],
          "amenities": [
              "Air conditioning",
              "Daily housekeeping",
              "Non-Smoking",
              "Wireless internet access",
              "Premium bedding",
              "Slippers",
              "Laptop-friendly workspace",
              "Separate bathtub and shower",
              "Number of beds - 2",
              "TV size measurement: inch",
              "Satellite TV service",
              "Private bathroom",
              "Towels provided",
              "Free bottled water",
              "TV size: 55",
              "Deep soaking bathtub",
              "LCD TV",
              "Wardrobe or closet",
              "Blackout drapes/curtains",
              "Television",
              "Minibar",
              "Bedsheets provided",
              "Desk",
              "Pillow menu",
              "In-room safe (laptop compatible)",
              "Free cribs/infant beds",
              "Bathrobes",
              "Iron/ironing board (on request)",
              "Electric kettle",
              "Hair dryer",
              "Turndown service",
              "Coffee/tea maker",
              "Room service (limited hours)",
              "Phone",
              "Rollaway/extra beds (surcharge)",
              "Free toiletries"
          ],
          "price_type": "single",
          "max_cash_payment": 4552.11,
          "coverted_max_cash_payment": 6264.26,
          "points": 156600,
          "bonuses": 0,
          "bonus_programs": [],
          "bonus_tiers": [],
          "lowest_price": 4552.11,
          "price": 6264.26,
          "converted_price": 6264.26,
          "lowest_converted_price": 6264.26,
          "chargeableRate": 4552.11,
          "market_rates": [],
          "base_rate": 3888.37,
          "included_taxes_and_fees_total": 663.74,
          "excluded_taxes_and_fees_total": 0,
          "excluded_taxes_and_fees_total_in_currency": 0,
          "included_taxes_and_fees": [
              {
                  "id": "tax_and_service_fee",
                  "amount": 663.74
              }
          ]
      },
      {
          "key": "er-D4BA4388A2DE0E55F420A507ADAC2D99-C032161CA73160875337BF746956FE56",
          "roomDescription": "Straits Club Quay Room",
          "roomNormalizedDescription": "Straits Club Quay Room",
          "type": "200007726",
          "free_cancellation": true,
          "roomAdditionalInfo": {
              "breakfastInfo": "hotel_detail_breakfast_included",
              "displayFields": {
                  "special_check_in_instructions": null,
                  "check_in_instructions": null,
                  "know_before_you_go": null,
                  "fees_optional": null,
                  "fees_mandatory": null,
                  "kaligo_service_fee": 586.05,
                  "hotel_fees": [],
                  "surcharges": [
                      {
                          "type": "TaxAndServiceFee",
                          "amount": 703.49
                      }
                  ]
              }
          },
          "description": "Straits Club Quay Room",
          "long_description": "<p><strong>1 King Bed</strong></p><p>388-sq-foot room with river views </p><br/><p><b>Club/Executive Level</b> - Club Lounge access, light refreshments, internet access in the lounge, and separate check-in location</p><p><b>Entertainment</b> - 55-inch LCD TV with satellite channels</p><p><b>Food & Drink</b> - Coffee/tea maker, minibar (fees may apply), electric kettle, and room service (limited hours)</p><p><b>Sleep</b> - Premium bedding, a pillow menu, blackout drapes/curtains, turndown service, and bed sheets </p><p><b>Bathroom</b> - Private bathroom, deep soaking bathtub and separate shower</p><p><b>Practical</b> - Laptop-compatible safe, laptop workspace, and phone; rollaway/extra beds and free cribs/infant beds available on request</p><p><b>Comfort</b> - Air conditioning and daily housekeeping</p><p>Non-Smoking</p>",
          "images": [
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/75866a15_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/75866a15_z.jpg",
                  "hero_image": true
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/aa04a714_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/aa04a714_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/9ec333cb_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/9ec333cb_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/b7789631_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/b7789631_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/6d67fe22_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/6d67fe22_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/f774cf64_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/f774cf64_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/7f4ebfe7_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/7f4ebfe7_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/cb65b89e_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/cb65b89e_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/4962f2ee_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/4962f2ee_z.jpg",
                  "hero_image": false
              }
          ],
          "amenities": [
              "Air conditioning",
              "Daily housekeeping",
              "Non-Smoking",
              "Wireless internet access",
              "Premium bedding",
              "Slippers",
              "Laptop-friendly workspace",
              "Separate bathtub and shower",
              "Number of beds - 2",
              "TV size measurement: inch",
              "Satellite TV service",
              "Private bathroom",
              "Towels provided",
              "Free bottled water",
              "TV size: 55",
              "Deep soaking bathtub",
              "LCD TV",
              "Wardrobe or closet",
              "Blackout drapes/curtains",
              "Television",
              "Minibar",
              "Bedsheets provided",
              "Desk",
              "Pillow menu",
              "In-room safe (laptop compatible)",
              "Free cribs/infant beds",
              "Bathrobes",
              "Iron/ironing board (on request)",
              "Electric kettle",
              "Hair dryer",
              "Turndown service",
              "Coffee/tea maker",
              "Room service (limited hours)",
              "Phone",
              "Rollaway/extra beds (surcharge)",
              "Free toiletries"
          ],
          "price_type": "single",
          "max_cash_payment": 4824.77,
          "coverted_max_cash_payment": 6639.48,
          "points": 165975,
          "bonuses": 0,
          "bonus_programs": [],
          "bonus_tiers": [],
          "lowest_price": 4824.77,
          "price": 6639.48,
          "converted_price": 6639.48,
          "lowest_converted_price": 6639.48,
          "chargeableRate": 4824.77,
          "market_rates": [],
          "base_rate": 4121.28,
          "included_taxes_and_fees_total": 703.49,
          "excluded_taxes_and_fees_total": 0,
          "excluded_taxes_and_fees_total_in_currency": 0,
          "included_taxes_and_fees": [
              {
                  "id": "tax_and_service_fee",
                  "amount": 703.49
              }
          ]
      },
      {
          "key": "er-D4BA4388A2DE0E55F420A507ADAC2D99-691A71798920CF684718CF3AF70916AD",
          "roomDescription": "Marina Bay View Room",
          "roomNormalizedDescription": "Marina Bay View Room",
          "type": "211208664",
          "free_cancellation": false,
          "roomAdditionalInfo": {
              "breakfastInfo": "hotel_detail_breakfast_for_2_included",
              "displayFields": {
                  "special_check_in_instructions": null,
                  "check_in_instructions": null,
                  "know_before_you_go": null,
                  "fees_optional": null,
                  "fees_mandatory": null,
                  "kaligo_service_fee": 634.17,
                  "hotel_fees": [],
                  "surcharges": [
                      {
                          "type": "TaxAndServiceFee",
                          "amount": 761.32
                      }
                  ]
              }
          },
          "description": "Marina Bay View Room",
          "long_description": "<p><strong>1 King Bed</strong></p><p>388-sq-foot room with bay views </p><br/><p><b>Entertainment</b> - 55-inch LCD TV with satellite channels</p><p><b>Food & Drink</b> - Coffee/tea maker, minibar (fees may apply), electric kettle, and room service (limited hours)</p><p><b>Sleep</b> - Premium bedding, a pillow menu, blackout drapes/curtains, turndown service, and bed sheets </p><p><b>Bathroom</b> - Private bathroom, deep soaking bathtub and separate shower</p><p><b>Practical</b> - Laptop-compatible safe, laptop workspace, and phone; rollaway/extra beds and free cribs/infant beds available on request</p><p><b>Comfort</b> - Air conditioning and daily housekeeping</p><p>Non-Smoking</p>",
          "images": [
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/e64515ee_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/e64515ee_z.jpg",
                  "hero_image": true
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/cc5a47ca_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/cc5a47ca_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/c9ae1636_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/c9ae1636_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/b7789631_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/b7789631_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/6d67fe22_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/6d67fe22_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/7dbae3db_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/7dbae3db_z.jpg",
                  "hero_image": false
              }
          ],
          "amenities": [
              "Air conditioning",
              "Daily housekeeping",
              "Non-Smoking",
              "Wireless internet access",
              "Premium bedding",
              "Slippers",
              "Laptop-friendly workspace",
              "Separate bathtub and shower",
              "Number of beds - 2",
              "TV size measurement: inch",
              "Satellite TV service",
              "Private bathroom",
              "Towels provided",
              "Free bottled water",
              "TV size: 55",
              "Deep soaking bathtub",
              "LCD TV",
              "Wardrobe or closet",
              "Blackout drapes/curtains",
              "Television",
              "Minibar",
              "Bedsheets provided",
              "Desk",
              "Pillow menu",
              "In-room safe (laptop compatible)",
              "Free cribs/infant beds",
              "Bathrobes",
              "Iron/ironing board (on request)",
              "Electric kettle",
              "Hair dryer",
              "Turndown service",
              "Coffee/tea maker",
              "Room service (limited hours)",
              "Phone",
              "Rollaway/extra beds (surcharge)",
              "Free toiletries"
          ],
          "price_type": "single",
          "max_cash_payment": 5221.17,
          "coverted_max_cash_payment": 7184.97,
          "points": 179600,
          "bonuses": 0,
          "bonus_programs": [],
          "bonus_tiers": [],
          "lowest_price": 5221.17,
          "price": 7184.97,
          "converted_price": 7184.97,
          "lowest_converted_price": 7184.97,
          "chargeableRate": 5221.17,
          "market_rates": [],
          "base_rate": 4459.85,
          "included_taxes_and_fees_total": 761.32,
          "excluded_taxes_and_fees_total": 0,
          "excluded_taxes_and_fees_total_in_currency": 0,
          "included_taxes_and_fees": [
              {
                  "id": "tax_and_service_fee",
                  "amount": 761.32
              }
          ]
      },
      {
          "key": "er-D4BA4388A2DE0E55F420A507ADAC2D99-AFF001E5ECF5C75F00B06F3527B48EA0",
          "roomDescription": "Marina Bay View Room",
          "roomNormalizedDescription": "Marina Bay View Room",
          "type": "211208664",
          "free_cancellation": true,
          "roomAdditionalInfo": {
              "breakfastInfo": "hotel_detail_breakfast_included",
              "displayFields": {
                  "special_check_in_instructions": null,
                  "check_in_instructions": null,
                  "know_before_you_go": null,
                  "fees_optional": null,
                  "fees_mandatory": null,
                  "kaligo_service_fee": 634.17,
                  "hotel_fees": [],
                  "surcharges": [
                      {
                          "type": "TaxAndServiceFee",
                          "amount": 761.32
                      }
                  ]
              }
          },
          "description": "Marina Bay View Room",
          "long_description": "<p><strong>1 King Bed</strong></p><p>388-sq-foot room with bay views </p><br/><p><b>Entertainment</b> - 55-inch LCD TV with satellite channels</p><p><b>Food & Drink</b> - Coffee/tea maker, minibar (fees may apply), electric kettle, and room service (limited hours)</p><p><b>Sleep</b> - Premium bedding, a pillow menu, blackout drapes/curtains, turndown service, and bed sheets </p><p><b>Bathroom</b> - Private bathroom, deep soaking bathtub and separate shower</p><p><b>Practical</b> - Laptop-compatible safe, laptop workspace, and phone; rollaway/extra beds and free cribs/infant beds available on request</p><p><b>Comfort</b> - Air conditioning and daily housekeeping</p><p>Non-Smoking</p>",
          "images": [
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/e64515ee_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/e64515ee_z.jpg",
                  "hero_image": true
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/cc5a47ca_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/cc5a47ca_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/c9ae1636_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/c9ae1636_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/b7789631_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/b7789631_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/6d67fe22_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/6d67fe22_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/7dbae3db_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/7dbae3db_z.jpg",
                  "hero_image": false
              }
          ],
          "amenities": [
              "Air conditioning",
              "Daily housekeeping",
              "Non-Smoking",
              "Wireless internet access",
              "Premium bedding",
              "Slippers",
              "Laptop-friendly workspace",
              "Separate bathtub and shower",
              "Number of beds - 2",
              "TV size measurement: inch",
              "Satellite TV service",
              "Private bathroom",
              "Towels provided",
              "Free bottled water",
              "TV size: 55",
              "Deep soaking bathtub",
              "LCD TV",
              "Wardrobe or closet",
              "Blackout drapes/curtains",
              "Television",
              "Minibar",
              "Bedsheets provided",
              "Desk",
              "Pillow menu",
              "In-room safe (laptop compatible)",
              "Free cribs/infant beds",
              "Bathrobes",
              "Iron/ironing board (on request)",
              "Electric kettle",
              "Hair dryer",
              "Turndown service",
              "Coffee/tea maker",
              "Room service (limited hours)",
              "Phone",
              "Rollaway/extra beds (surcharge)",
              "Free toiletries"
          ],
          "price_type": "single",
          "max_cash_payment": 5221.17,
          "coverted_max_cash_payment": 7184.97,
          "points": 179600,
          "bonuses": 0,
          "bonus_programs": [],
          "bonus_tiers": [],
          "lowest_price": 5221.17,
          "price": 7184.97,
          "converted_price": 7184.97,
          "lowest_converted_price": 7184.97,
          "chargeableRate": 5221.17,
          "market_rates": [],
          "base_rate": 4459.85,
          "included_taxes_and_fees_total": 761.32,
          "excluded_taxes_and_fees_total": 0,
          "excluded_taxes_and_fees_total_in_currency": 0,
          "included_taxes_and_fees": [
              {
                  "id": "tax_and_service_fee",
                  "amount": 761.32
              }
          ]
      },
      {
          "key": "er-D4BA4388A2DE0E55F420A507ADAC2D99-2008BBECC9A7AF1E0B4940BAF763D62B",
          "roomDescription": "Straits Club Marina Bay View Room",
          "roomNormalizedDescription": "Straits Club Marina Bay View Room",
          "type": "211207805",
          "free_cancellation": true,
          "roomAdditionalInfo": {
              "breakfastInfo": "hotel_detail_breakfast_included",
              "displayFields": {
                  "special_check_in_instructions": null,
                  "check_in_instructions": null,
                  "know_before_you_go": null,
                  "fees_optional": null,
                  "fees_mandatory": null,
                  "kaligo_service_fee": 641.24,
                  "hotel_fees": [],
                  "surcharges": [
                      {
                          "type": "TaxAndServiceFee",
                          "amount": 769.76
                      }
                  ]
              }
          },
          "description": "Straits Club Marina Bay View Room",
          "long_description": "<p><strong>1 King Bed</strong></p><p>388-sq-foot room with bay views </p><br/><p><b>Club/Executive Level</b> - Club Lounge access, light refreshments, internet access in the lounge, and separate check-in location</p><p><b>Entertainment</b> - 55-inch LCD TV with satellite channels</p><p><b>Food & Drink</b> - Coffee/tea maker, minibar (fees may apply), electric kettle, and room service (limited hours)</p><p><b>Sleep</b> - Premium bedding, a pillow menu, blackout drapes/curtains, turndown service, and bed sheets </p><p><b>Bathroom</b> - Private bathroom, deep soaking bathtub and separate shower</p><p><b>Practical</b> - Laptop-compatible safe, laptop workspace, and phone; rollaway/extra beds and free cribs/infant beds available on request</p><p><b>Comfort</b> - Air conditioning and daily housekeeping</p><p>Non-Smoking</p>",
          "images": [
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/d0bc0a41_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/d0bc0a41_z.jpg",
                  "hero_image": true
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/b7789631_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/b7789631_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/6d67fe22_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/6d67fe22_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/f774cf64_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/f774cf64_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/7f4ebfe7_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/7f4ebfe7_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/cb65b89e_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/cb65b89e_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/4962f2ee_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/4962f2ee_z.jpg",
                  "hero_image": false
              }
          ],
          "amenities": [
              "Air conditioning",
              "Daily housekeeping",
              "Non-Smoking",
              "Wireless internet access",
              "Premium bedding",
              "Slippers",
              "Laptop-friendly workspace",
              "Separate bathtub and shower",
              "Number of beds - 2",
              "TV size measurement: inch",
              "Satellite TV service",
              "Private bathroom",
              "Towels provided",
              "Free bottled water",
              "TV size: 55",
              "Deep soaking bathtub",
              "LCD TV",
              "Wardrobe or closet",
              "Blackout drapes/curtains",
              "Television",
              "Minibar",
              "Bedsheets provided",
              "Desk",
              "Pillow menu",
              "In-room safe (laptop compatible)",
              "Free cribs/infant beds",
              "Bathrobes",
              "Iron/ironing board (on request)",
              "Electric kettle",
              "Hair dryer",
              "Turndown service",
              "Coffee/tea maker",
              "Room service (limited hours)",
              "Phone",
              "Rollaway/extra beds (surcharge)",
              "Free toiletries"
          ],
          "price_type": "single",
          "max_cash_payment": 5279.23,
          "coverted_max_cash_payment": 7264.87,
          "points": 181600,
          "bonuses": 0,
          "bonus_programs": [],
          "bonus_tiers": [],
          "lowest_price": 5279.23,
          "price": 7264.87,
          "converted_price": 7264.87,
          "lowest_converted_price": 7264.87,
          "chargeableRate": 5279.23,
          "market_rates": [],
          "base_rate": 4509.47,
          "included_taxes_and_fees_total": 769.76,
          "excluded_taxes_and_fees_total": 0,
          "excluded_taxes_and_fees_total_in_currency": 0,
          "included_taxes_and_fees": [
              {
                  "id": "tax_and_service_fee",
                  "amount": 769.76
              }
          ]
      },
      {
          "key": "er-D4BA4388A2DE0E55F420A507ADAC2D99-75C1A13D985B47CE420FF77F28CC3A02",
          "roomDescription": "Premier Collyer Suite",
          "roomNormalizedDescription": "Premier Collyer Suite",
          "type": "201113111",
          "free_cancellation": false,
          "roomAdditionalInfo": {
              "breakfastInfo": "hotel_detail_room_only",
              "displayFields": {
                  "special_check_in_instructions": null,
                  "check_in_instructions": null,
                  "know_before_you_go": null,
                  "fees_optional": null,
                  "fees_mandatory": null,
                  "kaligo_service_fee": 699.21,
                  "hotel_fees": [],
                  "surcharges": [
                      {
                          "type": "TaxAndServiceFee",
                          "amount": 839.36
                      }
                  ]
              }
          },
          "description": "Premier Collyer Suite",
          "long_description": "<p><strong>1 King Bed</strong></p><p>695 sq feet </p><br/><p><b>Club/Executive Level</b> - Club Lounge access, light refreshments, internet access in the lounge, and separate check-in location</p><p><b>Entertainment</b> - 55-inch LCD TV with satellite channels</p><p><b>Food & Drink</b> - Coffee/tea maker, minibar (fees may apply), electric kettle, and room service (limited hours)</p><p><b>Sleep</b> - Premium bedding, a pillow menu, blackout drapes/curtains, turndown service, and bed sheets </p><p><b>Bathroom</b> - Private bathroom, deep soaking bathtub and separate shower</p><p><b>Practical</b> - Laptop-compatible safe, laptop workspace, and phone; rollaway/extra beds and free cribs/infant beds available on request</p><p><b>Comfort</b> - Air conditioning and daily housekeeping</p><p>Non-Smoking</p>",
          "images": [
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/3cf8b4d7_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/3cf8b4d7_z.jpg",
                  "hero_image": true
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/6d73b443_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/6d73b443_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/b4d75f5e_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/b4d75f5e_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/b7789631_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/b7789631_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/2f52f1df_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/2f52f1df_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/6d67fe22_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/6d67fe22_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/f774cf64_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/f774cf64_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/7f4ebfe7_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/7f4ebfe7_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/cb65b89e_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/cb65b89e_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/4962f2ee_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/4962f2ee_z.jpg",
                  "hero_image": false
              }
          ],
          "amenities": [
              "Air conditioning",
              "Daily housekeeping",
              "Non-Smoking",
              "Wireless internet access",
              "Premium bedding",
              "Slippers",
              "Laptop-friendly workspace",
              "Separate bathtub and shower",
              "Separate bedroom",
              "Number of beds - 2",
              "TV size measurement: inch",
              "Satellite TV service",
              "Private bathroom",
              "Towels provided",
              "Free bottled water",
              "TV size: 55",
              "Deep soaking bathtub",
              "LCD TV",
              "Wardrobe or closet",
              "Blackout drapes/curtains",
              "Television",
              "Minibar",
              "Bedsheets provided",
              "Desk",
              "Pillow menu",
              "In-room safe (laptop compatible)",
              "Free cribs/infant beds",
              "Bathrobes",
              "Iron/ironing board (on request)",
              "Electric kettle",
              "Hair dryer",
              "Turndown service",
              "Coffee/tea maker",
              "Room service (limited hours)",
              "Phone",
              "Rollaway/extra beds (surcharge)",
              "Free toiletries"
          ],
          "price_type": "single",
          "max_cash_payment": 5756.41,
          "coverted_max_cash_payment": 7921.53,
          "points": 198025,
          "bonuses": 0,
          "bonus_programs": [],
          "bonus_tiers": [],
          "lowest_price": 5756.41,
          "price": 7921.53,
          "converted_price": 7921.53,
          "lowest_converted_price": 7921.53,
          "chargeableRate": 5756.41,
          "market_rates": [],
          "base_rate": 4917.05,
          "included_taxes_and_fees_total": 839.36,
          "excluded_taxes_and_fees_total": 0,
          "excluded_taxes_and_fees_total_in_currency": 0,
          "included_taxes_and_fees": [
              {
                  "id": "tax_and_service_fee",
                  "amount": 839.36
              }
          ]
      },
      {
          "key": "er-D4BA4388A2DE0E55F420A507ADAC2D99-AEBEFE89B631246C9C0CFC6E64349DED",
          "roomDescription": "Premier Collyer Suite",
          "roomNormalizedDescription": "Premier Collyer Suite",
          "type": "201113111",
          "free_cancellation": false,
          "roomAdditionalInfo": {
              "breakfastInfo": "hotel_detail_breakfast_included",
              "displayFields": {
                  "special_check_in_instructions": null,
                  "check_in_instructions": null,
                  "know_before_you_go": null,
                  "fees_optional": null,
                  "fees_mandatory": null,
                  "kaligo_service_fee": 750.71,
                  "hotel_fees": [],
                  "surcharges": [
                      {
                          "type": "TaxAndServiceFee",
                          "amount": 901.23
                      }
                  ]
              }
          },
          "description": "Premier Collyer Suite",
          "long_description": "<p><strong>1 King Bed</strong></p><p>695 sq feet </p><br/><p><b>Club/Executive Level</b> - Club Lounge access, light refreshments, internet access in the lounge, and separate check-in location</p><p><b>Entertainment</b> - 55-inch LCD TV with satellite channels</p><p><b>Food & Drink</b> - Coffee/tea maker, minibar (fees may apply), electric kettle, and room service (limited hours)</p><p><b>Sleep</b> - Premium bedding, a pillow menu, blackout drapes/curtains, turndown service, and bed sheets </p><p><b>Bathroom</b> - Private bathroom, deep soaking bathtub and separate shower</p><p><b>Practical</b> - Laptop-compatible safe, laptop workspace, and phone; rollaway/extra beds and free cribs/infant beds available on request</p><p><b>Comfort</b> - Air conditioning and daily housekeeping</p><p>Non-Smoking</p>",
          "images": [
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/3cf8b4d7_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/3cf8b4d7_z.jpg",
                  "hero_image": true
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/6d73b443_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/6d73b443_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/b4d75f5e_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/b4d75f5e_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/b7789631_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/b7789631_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/2f52f1df_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/2f52f1df_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/6d67fe22_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/6d67fe22_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/f774cf64_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/f774cf64_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/7f4ebfe7_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/7f4ebfe7_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/cb65b89e_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/cb65b89e_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/4962f2ee_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/4962f2ee_z.jpg",
                  "hero_image": false
              }
          ],
          "amenities": [
              "Air conditioning",
              "Daily housekeeping",
              "Non-Smoking",
              "Wireless internet access",
              "Premium bedding",
              "Slippers",
              "Laptop-friendly workspace",
              "Separate bathtub and shower",
              "Separate bedroom",
              "Number of beds - 2",
              "TV size measurement: inch",
              "Satellite TV service",
              "Private bathroom",
              "Towels provided",
              "Free bottled water",
              "TV size: 55",
              "Deep soaking bathtub",
              "LCD TV",
              "Wardrobe or closet",
              "Blackout drapes/curtains",
              "Television",
              "Minibar",
              "Bedsheets provided",
              "Desk",
              "Pillow menu",
              "In-room safe (laptop compatible)",
              "Free cribs/infant beds",
              "Bathrobes",
              "Iron/ironing board (on request)",
              "Electric kettle",
              "Hair dryer",
              "Turndown service",
              "Coffee/tea maker",
              "Room service (limited hours)",
              "Phone",
              "Rollaway/extra beds (surcharge)",
              "Free toiletries"
          ],
          "price_type": "single",
          "max_cash_payment": 6180.56,
          "coverted_max_cash_payment": 8505.21,
          "points": 212625,
          "bonuses": 0,
          "bonus_programs": [],
          "bonus_tiers": [],
          "lowest_price": 6180.56,
          "price": 8505.21,
          "converted_price": 8505.21,
          "lowest_converted_price": 8505.21,
          "chargeableRate": 6180.56,
          "market_rates": [],
          "base_rate": 5279.33,
          "included_taxes_and_fees_total": 901.23,
          "excluded_taxes_and_fees_total": 0,
          "excluded_taxes_and_fees_total_in_currency": 0,
          "included_taxes_and_fees": [
              {
                  "id": "tax_and_service_fee",
                  "amount": 901.23
              }
          ]
      },
      {
          "key": "er-D4BA4388A2DE0E55F420A507ADAC2D99-EA05EE377AF3F5184374B1298EF0CB86",
          "roomDescription": "Palladian Suite",
          "roomNormalizedDescription": "Palladian Suite",
          "type": "201664822",
          "free_cancellation": false,
          "roomAdditionalInfo": {
              "breakfastInfo": "hotel_detail_room_only",
              "displayFields": {
                  "special_check_in_instructions": null,
                  "check_in_instructions": null,
                  "know_before_you_go": null,
                  "fees_optional": null,
                  "fees_mandatory": null,
                  "kaligo_service_fee": 874,
                  "hotel_fees": [],
                  "surcharges": [
                      {
                          "type": "TaxAndServiceFee",
                          "amount": 1049.22
                      }
                  ]
              }
          },
          "description": "Palladian Suite",
          "long_description": "<p><strong>1 King Bed</strong></p><p>1001-sq-foot room with bay views </p><br/><p><b>Club/Executive Level</b> - Club Lounge access, light refreshments, internet access in the lounge, and separate check-in location</p><p><b>Layout</b> - Bedroom </p><p><b>Entertainment</b> - 55-inch LCD TV with satellite channels</p><p><b>Food & Drink</b> - Coffee/tea maker, minibar (fees may apply), electric kettle, and room service (limited hours)</p><p><b>Sleep</b> - Premium bedding, a pillow menu, blackout drapes/curtains, turndown service, and bed sheets </p><p><b>Bathroom</b> - Private bathroom, deep soaking bathtub and separate shower</p><p><b>Practical</b> - Laptop-compatible safe, laptop workspace, and phone; rollaway/extra beds and free cribs/infant beds available on request</p><p><b>Comfort</b> - Air conditioning and daily housekeeping</p><p>Non-Smoking</p>",
          "images": [
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/w2874h1901x6y0-14d78664_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/w2874h1901x6y0-14d78664_z.jpg",
                  "hero_image": true
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/b7789631_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/b7789631_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/b5756ecf_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/b5756ecf_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/0a42b9f1_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/0a42b9f1_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/6d67fe22_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/6d67fe22_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/f774cf64_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/f774cf64_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/7f4ebfe7_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/7f4ebfe7_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/cb65b89e_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/cb65b89e_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/4962f2ee_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/4962f2ee_z.jpg",
                  "hero_image": false
              }
          ],
          "amenities": [
              "Air conditioning",
              "Daily housekeeping",
              "Non-Smoking",
              "Wireless internet access",
              "Premium bedding",
              "Slippers",
              "Laptop-friendly workspace",
              "Separate bathtub and shower",
              "Number of beds - 2",
              "TV size measurement: inch",
              "Satellite TV service",
              "Private bathroom",
              "Towels provided",
              "Free bottled water",
              "TV size: 55",
              "Deep soaking bathtub",
              "LCD TV",
              "Wardrobe or closet",
              "Blackout drapes/curtains",
              "Television",
              "Minibar",
              "Bedsheets provided",
              "Desk",
              "Pillow menu",
              "In-room safe (laptop compatible)",
              "Free cribs/infant beds",
              "Bathrobes",
              "Iron/ironing board (on request)",
              "Electric kettle",
              "Hair dryer",
              "Turndown service",
              "Coffee/tea maker",
              "Room service (limited hours)",
              "Phone",
              "Rollaway/extra beds (surcharge)",
              "Free toiletries"
          ],
          "price_type": "single",
          "max_cash_payment": 7195.54,
          "coverted_max_cash_payment": 9901.95,
          "points": 247525,
          "bonuses": 0,
          "bonus_programs": [],
          "bonus_tiers": [],
          "lowest_price": 7195.54,
          "price": 9901.95,
          "converted_price": 9901.95,
          "lowest_converted_price": 9901.95,
          "chargeableRate": 7195.54,
          "market_rates": [],
          "base_rate": 6146.32,
          "included_taxes_and_fees_total": 1049.22,
          "excluded_taxes_and_fees_total": 0,
          "excluded_taxes_and_fees_total_in_currency": 0,
          "included_taxes_and_fees": [
              {
                  "id": "tax_and_service_fee",
                  "amount": 1049.22
              }
          ]
      },
      {
          "key": "er-D4BA4388A2DE0E55F420A507ADAC2D99-0EA2D58C7B4EC91167FFCA25D03C9823",
          "roomDescription": "Premier Collyer Suite",
          "roomNormalizedDescription": "Premier Collyer Suite",
          "type": "201113111",
          "free_cancellation": true,
          "roomAdditionalInfo": {
              "breakfastInfo": "hotel_detail_breakfast_included",
              "displayFields": {
                  "special_check_in_instructions": null,
                  "check_in_instructions": null,
                  "know_before_you_go": null,
                  "fees_optional": null,
                  "fees_mandatory": null,
                  "kaligo_service_fee": 883.19,
                  "hotel_fees": [],
                  "surcharges": [
                      {
                          "type": "TaxAndServiceFee",
                          "amount": 1060.26
                      }
                  ]
              }
          },
          "description": "Premier Collyer Suite",
          "long_description": "<p><strong>1 King Bed</strong></p><p>695 sq feet </p><br/><p><b>Club/Executive Level</b> - Club Lounge access, light refreshments, internet access in the lounge, and separate check-in location</p><p><b>Entertainment</b> - 55-inch LCD TV with satellite channels</p><p><b>Food & Drink</b> - Coffee/tea maker, minibar (fees may apply), electric kettle, and room service (limited hours)</p><p><b>Sleep</b> - Premium bedding, a pillow menu, blackout drapes/curtains, turndown service, and bed sheets </p><p><b>Bathroom</b> - Private bathroom, deep soaking bathtub and separate shower</p><p><b>Practical</b> - Laptop-compatible safe, laptop workspace, and phone; rollaway/extra beds and free cribs/infant beds available on request</p><p><b>Comfort</b> - Air conditioning and daily housekeeping</p><p>Non-Smoking</p>",
          "images": [
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/3cf8b4d7_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/3cf8b4d7_z.jpg",
                  "hero_image": true
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/6d73b443_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/6d73b443_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/b4d75f5e_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/b4d75f5e_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/b7789631_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/b7789631_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/2f52f1df_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/2f52f1df_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/6d67fe22_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/6d67fe22_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/f774cf64_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/f774cf64_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/7f4ebfe7_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/7f4ebfe7_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/cb65b89e_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/cb65b89e_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/4962f2ee_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/4962f2ee_z.jpg",
                  "hero_image": false
              }
          ],
          "amenities": [
              "Air conditioning",
              "Daily housekeeping",
              "Non-Smoking",
              "Wireless internet access",
              "Premium bedding",
              "Slippers",
              "Laptop-friendly workspace",
              "Separate bathtub and shower",
              "Separate bedroom",
              "Number of beds - 2",
              "TV size measurement: inch",
              "Satellite TV service",
              "Private bathroom",
              "Towels provided",
              "Free bottled water",
              "TV size: 55",
              "Deep soaking bathtub",
              "LCD TV",
              "Wardrobe or closet",
              "Blackout drapes/curtains",
              "Television",
              "Minibar",
              "Bedsheets provided",
              "Desk",
              "Pillow menu",
              "In-room safe (laptop compatible)",
              "Free cribs/infant beds",
              "Bathrobes",
              "Iron/ironing board (on request)",
              "Electric kettle",
              "Hair dryer",
              "Turndown service",
              "Coffee/tea maker",
              "Room service (limited hours)",
              "Phone",
              "Rollaway/extra beds (surcharge)",
              "Free toiletries"
          ],
          "price_type": "single",
          "max_cash_payment": 7271.27,
          "coverted_max_cash_payment": 10006.16,
          "points": 250150,
          "bonuses": 0,
          "bonus_programs": [],
          "bonus_tiers": [],
          "lowest_price": 7271.27,
          "price": 10006.16,
          "converted_price": 10006.16,
          "lowest_converted_price": 10006.16,
          "chargeableRate": 7271.27,
          "market_rates": [],
          "base_rate": 6211.01,
          "included_taxes_and_fees_total": 1060.26,
          "excluded_taxes_and_fees_total": 0,
          "excluded_taxes_and_fees_total_in_currency": 0,
          "included_taxes_and_fees": [
              {
                  "id": "tax_and_service_fee",
                  "amount": 1060.26
              }
          ]
      },
      {
          "key": "er-D4BA4388A2DE0E55F420A507ADAC2D99-465AC7B5C2D5B714D842B266A96A1C3E",
          "roomDescription": "Palladian Suite",
          "roomNormalizedDescription": "Palladian Suite",
          "type": "201664822",
          "free_cancellation": false,
          "roomAdditionalInfo": {
              "breakfastInfo": "hotel_detail_breakfast_included",
              "displayFields": {
                  "special_check_in_instructions": null,
                  "check_in_instructions": null,
                  "know_before_you_go": null,
                  "fees_optional": null,
                  "fees_mandatory": null,
                  "kaligo_service_fee": 938.41,
                  "hotel_fees": [],
                  "surcharges": [
                      {
                          "type": "TaxAndServiceFee",
                          "amount": 1126.47
                      }
                  ]
              }
          },
          "description": "Palladian Suite",
          "long_description": "<p><strong>1 King Bed</strong></p><p>1001-sq-foot room with bay views </p><br/><p><b>Club/Executive Level</b> - Club Lounge access, light refreshments, internet access in the lounge, and separate check-in location</p><p><b>Layout</b> - Bedroom </p><p><b>Entertainment</b> - 55-inch LCD TV with satellite channels</p><p><b>Food & Drink</b> - Coffee/tea maker, minibar (fees may apply), electric kettle, and room service (limited hours)</p><p><b>Sleep</b> - Premium bedding, a pillow menu, blackout drapes/curtains, turndown service, and bed sheets </p><p><b>Bathroom</b> - Private bathroom, deep soaking bathtub and separate shower</p><p><b>Practical</b> - Laptop-compatible safe, laptop workspace, and phone; rollaway/extra beds and free cribs/infant beds available on request</p><p><b>Comfort</b> - Air conditioning and daily housekeeping</p><p>Non-Smoking</p>",
          "images": [
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/w2874h1901x6y0-14d78664_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/w2874h1901x6y0-14d78664_z.jpg",
                  "hero_image": true
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/b7789631_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/b7789631_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/b5756ecf_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/b5756ecf_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/0a42b9f1_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/0a42b9f1_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/6d67fe22_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/6d67fe22_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/f774cf64_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/f774cf64_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/7f4ebfe7_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/7f4ebfe7_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/cb65b89e_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/cb65b89e_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/4962f2ee_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/4962f2ee_z.jpg",
                  "hero_image": false
              }
          ],
          "amenities": [
              "Air conditioning",
              "Daily housekeeping",
              "Non-Smoking",
              "Wireless internet access",
              "Premium bedding",
              "Slippers",
              "Laptop-friendly workspace",
              "Separate bathtub and shower",
              "Number of beds - 2",
              "TV size measurement: inch",
              "Satellite TV service",
              "Private bathroom",
              "Towels provided",
              "Free bottled water",
              "TV size: 55",
              "Deep soaking bathtub",
              "LCD TV",
              "Wardrobe or closet",
              "Blackout drapes/curtains",
              "Television",
              "Minibar",
              "Bedsheets provided",
              "Desk",
              "Pillow menu",
              "In-room safe (laptop compatible)",
              "Free cribs/infant beds",
              "Bathrobes",
              "Iron/ironing board (on request)",
              "Electric kettle",
              "Hair dryer",
              "Turndown service",
              "Coffee/tea maker",
              "Room service (limited hours)",
              "Phone",
              "Rollaway/extra beds (surcharge)",
              "Free toiletries"
          ],
          "price_type": "single",
          "max_cash_payment": 7725.7,
          "coverted_max_cash_payment": 10631.51,
          "points": 265775,
          "bonuses": 0,
          "bonus_programs": [],
          "bonus_tiers": [],
          "lowest_price": 7725.7,
          "price": 10631.51,
          "converted_price": 10631.51,
          "lowest_converted_price": 10631.51,
          "chargeableRate": 7725.7,
          "market_rates": [],
          "base_rate": 6599.23,
          "included_taxes_and_fees_total": 1126.47,
          "excluded_taxes_and_fees_total": 0,
          "excluded_taxes_and_fees_total_in_currency": 0,
          "included_taxes_and_fees": [
              {
                  "id": "tax_and_service_fee",
                  "amount": 1126.47
              }
          ]
      },
      {
          "key": "er-D4BA4388A2DE0E55F420A507ADAC2D99-D7E4D970EEAEB96E29BCDF4C31610D75",
          "roomDescription": "Palladian Suite",
          "roomNormalizedDescription": "Palladian Suite",
          "type": "201664822",
          "free_cancellation": true,
          "roomAdditionalInfo": {
              "breakfastInfo": "hotel_detail_breakfast_included",
              "displayFields": {
                  "special_check_in_instructions": null,
                  "check_in_instructions": null,
                  "know_before_you_go": null,
                  "fees_optional": null,
                  "fees_mandatory": null,
                  "kaligo_service_fee": 1104,
                  "hotel_fees": [],
                  "surcharges": [
                      {
                          "type": "TaxAndServiceFee",
                          "amount": 1325.31
                      }
                  ]
              }
          },
          "description": "Palladian Suite",
          "long_description": "<p><strong>1 King Bed</strong></p><p>1001-sq-foot room with bay views </p><br/><p><b>Club/Executive Level</b> - Club Lounge access, light refreshments, internet access in the lounge, and separate check-in location</p><p><b>Layout</b> - Bedroom </p><p><b>Entertainment</b> - 55-inch LCD TV with satellite channels</p><p><b>Food & Drink</b> - Coffee/tea maker, minibar (fees may apply), electric kettle, and room service (limited hours)</p><p><b>Sleep</b> - Premium bedding, a pillow menu, blackout drapes/curtains, turndown service, and bed sheets </p><p><b>Bathroom</b> - Private bathroom, deep soaking bathtub and separate shower</p><p><b>Practical</b> - Laptop-compatible safe, laptop workspace, and phone; rollaway/extra beds and free cribs/infant beds available on request</p><p><b>Comfort</b> - Air conditioning and daily housekeeping</p><p>Non-Smoking</p>",
          "images": [
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/w2874h1901x6y0-14d78664_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/w2874h1901x6y0-14d78664_z.jpg",
                  "hero_image": true
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/b7789631_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/b7789631_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/b5756ecf_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/b5756ecf_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/0a42b9f1_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/0a42b9f1_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/6d67fe22_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/6d67fe22_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/f774cf64_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/f774cf64_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/7f4ebfe7_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/7f4ebfe7_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/cb65b89e_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/cb65b89e_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/4962f2ee_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/4962f2ee_z.jpg",
                  "hero_image": false
              }
          ],
          "amenities": [
              "Air conditioning",
              "Daily housekeeping",
              "Non-Smoking",
              "Wireless internet access",
              "Premium bedding",
              "Slippers",
              "Laptop-friendly workspace",
              "Separate bathtub and shower",
              "Number of beds - 2",
              "TV size measurement: inch",
              "Satellite TV service",
              "Private bathroom",
              "Towels provided",
              "Free bottled water",
              "TV size: 55",
              "Deep soaking bathtub",
              "LCD TV",
              "Wardrobe or closet",
              "Blackout drapes/curtains",
              "Television",
              "Minibar",
              "Bedsheets provided",
              "Desk",
              "Pillow menu",
              "In-room safe (laptop compatible)",
              "Free cribs/infant beds",
              "Bathrobes",
              "Iron/ironing board (on request)",
              "Electric kettle",
              "Hair dryer",
              "Turndown service",
              "Coffee/tea maker",
              "Room service (limited hours)",
              "Phone",
              "Rollaway/extra beds (surcharge)",
              "Free toiletries"
          ],
          "price_type": "single",
          "max_cash_payment": 9089.07,
          "coverted_max_cash_payment": 12507.68,
          "points": 312675,
          "bonuses": 0,
          "bonus_programs": [],
          "bonus_tiers": [],
          "lowest_price": 9089.07,
          "price": 12507.68,
          "converted_price": 12507.68,
          "lowest_converted_price": 12507.68,
          "chargeableRate": 9089.07,
          "market_rates": [],
          "base_rate": 7763.76,
          "included_taxes_and_fees_total": 1325.31,
          "excluded_taxes_and_fees_total": 0,
          "excluded_taxes_and_fees_total_in_currency": 0,
          "included_taxes_and_fees": [
              {
                  "id": "tax_and_service_fee",
                  "amount": 1325.31
              }
          ]
      },
      {
          "key": "er-D4BA4388A2DE0E55F420A507ADAC2D99-313C44F8244584BEC32BCF3124C44BF9",
          "roomDescription": "Loft Suite",
          "roomNormalizedDescription": "Loft Suite",
          "type": "201664875",
          "free_cancellation": false,
          "roomAdditionalInfo": {
              "breakfastInfo": "hotel_detail_room_only",
              "displayFields": {
                  "special_check_in_instructions": null,
                  "check_in_instructions": null,
                  "know_before_you_go": null,
                  "fees_optional": null,
                  "fees_mandatory": null,
                  "kaligo_service_fee": 1282.48,
                  "hotel_fees": [],
                  "surcharges": [
                      {
                          "type": "TaxAndServiceFee",
                          "amount": 1539.58
                      }
                  ]
              }
          },
          "description": "Loft Suite",
          "long_description": "<p><strong>1 King Bed</strong></p><p>1171-sq-foot room with bay views </p><br/><p><b>Club/Executive Level</b> - Club Lounge access, light refreshments, internet access in the lounge, and separate check-in location</p><p><b>Layout</b> - Bedroom </p><p><b>Entertainment</b> - 55-inch LCD TV with satellite channels</p><p><b>Food & Drink</b> - Coffee/tea maker, minibar (fees may apply), electric kettle, and room service (limited hours)</p><p><b>Sleep</b> - Premium bedding, a pillow menu, blackout drapes/curtains, turndown service, and bed sheets </p><p><b>Bathroom</b> - Private bathroom, deep soaking bathtub and separate shower</p><p><b>Practical</b> - Laptop-compatible safe, laptop workspace, and phone</p><p><b>Comfort</b> - Air conditioning and daily housekeeping</p><p><b>Need to Know</b> - No cribs (infant beds) or rollaway/extra beds available</p><p>Non-Smoking</p>",
          "images": [
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/72380ced_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/72380ced_z.jpg",
                  "hero_image": true
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/59949c3f_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/59949c3f_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/3fd10369_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/3fd10369_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/88480012_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/88480012_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/d1d6ad2b_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/d1d6ad2b_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/bf1c785b_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/bf1c785b_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/3669bb29_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/3669bb29_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/6c561ab5_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/6c561ab5_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/b7789631_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/b7789631_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/8df74fb1_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/8df74fb1_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/6d67fe22_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/6d67fe22_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/f774cf64_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/f774cf64_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/7f4ebfe7_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/7f4ebfe7_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/cb65b89e_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/cb65b89e_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/4962f2ee_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/4962f2ee_z.jpg",
                  "hero_image": false
              }
          ],
          "amenities": [
              "Air conditioning",
              "Daily housekeeping",
              "Non-Smoking",
              "Wireless internet access",
              "Premium bedding",
              "Slippers",
              "Laptop-friendly workspace",
              "Separate bathtub and shower",
              "Number of beds - 2",
              "TV size measurement: inch",
              "Satellite TV service",
              "Private bathroom",
              "Towels provided",
              "Free bottled water",
              "TV size: 55",
              "Deep soaking bathtub",
              "LCD TV",
              "Wardrobe or closet",
              "Blackout drapes/curtains",
              "Television",
              "Minibar",
              "No rollaway/extra beds",
              "Bedsheets provided",
              "Desk",
              "Pillow menu",
              "In-room safe (laptop compatible)",
              "Bathrobes",
              "Iron/ironing board (on request)",
              "Electric kettle",
              "Hair dryer",
              "Turndown service",
              "Coffee/tea maker",
              "Room service (limited hours)",
              "Phone",
              "Free toiletries",
              "No cribs (infant beds)"
          ],
          "price_type": "single",
          "max_cash_payment": 10558.46,
          "coverted_max_cash_payment": 14529.74,
          "points": 363225,
          "bonuses": 0,
          "bonus_programs": [],
          "bonus_tiers": [],
          "lowest_price": 10558.46,
          "price": 14529.74,
          "converted_price": 14529.74,
          "lowest_converted_price": 14529.74,
          "chargeableRate": 10558.46,
          "market_rates": [],
          "base_rate": 9018.88,
          "included_taxes_and_fees_total": 1539.58,
          "excluded_taxes_and_fees_total": 0,
          "excluded_taxes_and_fees_total_in_currency": 0,
          "included_taxes_and_fees": [
              {
                  "id": "tax_and_service_fee",
                  "amount": 1539.58
              }
          ]
      },
      {
          "key": "er-D4BA4388A2DE0E55F420A507ADAC2D99-9CA1D986FF20E3CF0ED385FCDFDA741E",
          "roomDescription": "Loft Suite",
          "roomNormalizedDescription": "Loft Suite",
          "type": "201664875",
          "free_cancellation": false,
          "roomAdditionalInfo": {
              "breakfastInfo": "hotel_detail_breakfast_included",
              "displayFields": {
                  "special_check_in_instructions": null,
                  "check_in_instructions": null,
                  "know_before_you_go": null,
                  "fees_optional": null,
                  "fees_mandatory": null,
                  "kaligo_service_fee": 1376.3,
                  "hotel_fees": [],
                  "surcharges": [
                      {
                          "type": "TaxAndServiceFee",
                          "amount": 1652.22
                      }
                  ]
              }
          },
          "description": "Loft Suite",
          "long_description": "<p><strong>1 King Bed</strong></p><p>1171-sq-foot room with bay views </p><br/><p><b>Club/Executive Level</b> - Club Lounge access, light refreshments, internet access in the lounge, and separate check-in location</p><p><b>Layout</b> - Bedroom </p><p><b>Entertainment</b> - 55-inch LCD TV with satellite channels</p><p><b>Food & Drink</b> - Coffee/tea maker, minibar (fees may apply), electric kettle, and room service (limited hours)</p><p><b>Sleep</b> - Premium bedding, a pillow menu, blackout drapes/curtains, turndown service, and bed sheets </p><p><b>Bathroom</b> - Private bathroom, deep soaking bathtub and separate shower</p><p><b>Practical</b> - Laptop-compatible safe, laptop workspace, and phone</p><p><b>Comfort</b> - Air conditioning and daily housekeeping</p><p><b>Need to Know</b> - No cribs (infant beds) or rollaway/extra beds available</p><p>Non-Smoking</p>",
          "images": [
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/72380ced_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/72380ced_z.jpg",
                  "hero_image": true
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/59949c3f_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/59949c3f_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/3fd10369_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/3fd10369_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/88480012_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/88480012_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/d1d6ad2b_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/d1d6ad2b_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/bf1c785b_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/bf1c785b_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/3669bb29_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/3669bb29_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/6c561ab5_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/6c561ab5_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/b7789631_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/b7789631_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/8df74fb1_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/8df74fb1_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/6d67fe22_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/6d67fe22_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/f774cf64_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/f774cf64_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/7f4ebfe7_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/7f4ebfe7_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/cb65b89e_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/cb65b89e_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/4962f2ee_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/4962f2ee_z.jpg",
                  "hero_image": false
              }
          ],
          "amenities": [
              "Air conditioning",
              "Daily housekeeping",
              "Non-Smoking",
              "Wireless internet access",
              "Premium bedding",
              "Slippers",
              "Laptop-friendly workspace",
              "Separate bathtub and shower",
              "Number of beds - 2",
              "TV size measurement: inch",
              "Satellite TV service",
              "Private bathroom",
              "Towels provided",
              "Free bottled water",
              "TV size: 55",
              "Deep soaking bathtub",
              "LCD TV",
              "Wardrobe or closet",
              "Blackout drapes/curtains",
              "Television",
              "Minibar",
              "No rollaway/extra beds",
              "Bedsheets provided",
              "Desk",
              "Pillow menu",
              "In-room safe (laptop compatible)",
              "Bathrobes",
              "Iron/ironing board (on request)",
              "Electric kettle",
              "Hair dryer",
              "Turndown service",
              "Coffee/tea maker",
              "Room service (limited hours)",
              "Phone",
              "Free toiletries",
              "No cribs (infant beds)"
          ],
          "price_type": "single",
          "max_cash_payment": 11331.02,
          "coverted_max_cash_payment": 15592.87,
          "points": 389800,
          "bonuses": 0,
          "bonus_programs": [],
          "bonus_tiers": [],
          "lowest_price": 11331.02,
          "price": 15592.87,
          "converted_price": 15592.87,
          "lowest_converted_price": 15592.87,
          "chargeableRate": 11331.02,
          "market_rates": [],
          "base_rate": 9678.8,
          "included_taxes_and_fees_total": 1652.22,
          "excluded_taxes_and_fees_total": 0,
          "excluded_taxes_and_fees_total_in_currency": 0,
          "included_taxes_and_fees": [
              {
                  "id": "tax_and_service_fee",
                  "amount": 1652.22
              }
          ]
      },
      {
          "key": "er-D4BA4388A2DE0E55F420A507ADAC2D99-3663D807C00B4D65EA45751FF5B820D3",
          "roomDescription": "Loft Suite",
          "roomNormalizedDescription": "Loft Suite",
          "type": "201664875",
          "free_cancellation": true,
          "roomAdditionalInfo": {
              "breakfastInfo": "hotel_detail_breakfast_included",
              "displayFields": {
                  "special_check_in_instructions": null,
                  "check_in_instructions": null,
                  "know_before_you_go": null,
                  "fees_optional": null,
                  "fees_mandatory": null,
                  "kaligo_service_fee": 1619.23,
                  "hotel_fees": [],
                  "surcharges": [
                      {
                          "type": "TaxAndServiceFee",
                          "amount": 1943.73
                      }
                  ]
              }
          },
          "description": "Loft Suite",
          "long_description": "<p><strong>1 King Bed</strong></p><p>1171-sq-foot room with bay views </p><br/><p><b>Club/Executive Level</b> - Club Lounge access, light refreshments, internet access in the lounge, and separate check-in location</p><p><b>Layout</b> - Bedroom </p><p><b>Entertainment</b> - 55-inch LCD TV with satellite channels</p><p><b>Food & Drink</b> - Coffee/tea maker, minibar (fees may apply), electric kettle, and room service (limited hours)</p><p><b>Sleep</b> - Premium bedding, a pillow menu, blackout drapes/curtains, turndown service, and bed sheets </p><p><b>Bathroom</b> - Private bathroom, deep soaking bathtub and separate shower</p><p><b>Practical</b> - Laptop-compatible safe, laptop workspace, and phone</p><p><b>Comfort</b> - Air conditioning and daily housekeeping</p><p><b>Need to Know</b> - No cribs (infant beds) or rollaway/extra beds available</p><p>Non-Smoking</p>",
          "images": [
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/72380ced_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/72380ced_z.jpg",
                  "hero_image": true
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/59949c3f_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/59949c3f_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/3fd10369_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/3fd10369_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/88480012_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/88480012_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/d1d6ad2b_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/d1d6ad2b_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/bf1c785b_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/bf1c785b_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/3669bb29_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/3669bb29_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/6c561ab5_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/6c561ab5_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/b7789631_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/b7789631_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/8df74fb1_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/8df74fb1_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/6d67fe22_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/6d67fe22_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/f774cf64_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/f774cf64_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/7f4ebfe7_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/7f4ebfe7_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/cb65b89e_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/cb65b89e_z.jpg",
                  "hero_image": false
              },
              {
                  "url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/4962f2ee_b.jpg",
                  "high_resolution_url": "https://i.travelapi.com/lodging/1000000/900000/893000/892940/4962f2ee_z.jpg",
                  "hero_image": false
              }
          ],
          "amenities": [
              "Air conditioning",
              "Daily housekeeping",
              "Non-Smoking",
              "Wireless internet access",
              "Premium bedding",
              "Slippers",
              "Laptop-friendly workspace",
              "Separate bathtub and shower",
              "Number of beds - 2",
              "TV size measurement: inch",
              "Satellite TV service",
              "Private bathroom",
              "Towels provided",
              "Free bottled water",
              "TV size: 55",
              "Deep soaking bathtub",
              "LCD TV",
              "Wardrobe or closet",
              "Blackout drapes/curtains",
              "Television",
              "Minibar",
              "No rollaway/extra beds",
              "Bedsheets provided",
              "Desk",
              "Pillow menu",
              "In-room safe (laptop compatible)",
              "Bathrobes",
              "Iron/ironing board (on request)",
              "Electric kettle",
              "Hair dryer",
              "Turndown service",
              "Coffee/tea maker",
              "Room service (limited hours)",
              "Phone",
              "Free toiletries",
              "No cribs (infant beds)"
          ],
          "price_type": "single",
          "max_cash_payment": 13330.6,
          "coverted_max_cash_payment": 18344.54,
          "points": 458600,
          "bonuses": 0,
          "bonus_programs": [],
          "bonus_tiers": [],
          "lowest_price": 13330.6,
          "price": 18344.54,
          "converted_price": 18344.54,
          "lowest_converted_price": 18344.54,
          "chargeableRate": 13330.6,
          "market_rates": [],
          "base_rate": 11386.87,
          "included_taxes_and_fees_total": 1943.73,
          "excluded_taxes_and_fees_total": 0,
          "excluded_taxes_and_fees_total_in_currency": 0,
          "included_taxes_and_fees": [
              {
                  "id": "tax_and_service_fee",
                  "amount": 1943.73
              }
          ]
      }
  ]
}


// const RoomCard = ({ room }) => (
//   <div className="room-card">
//     <img src={room.images[0].url} alt={room.name} className="room-image" />
//     <div className="room-details">
//       <h3 className="room-name">{room.name}</h3>
//       <div className="room-description" dangerouslySetInnerHTML={{ __html: room.description }} />
//       <p className="room-info">{room.additionalInfo}</p>
//       <p className="room-wifi">Free WiFi</p>
//       <div className="room-price-details">
//         <p className="room-price">SGD {room.price.toFixed(2)}</p>
//         <p className="room-stay-info">1 night, 1 adult</p>
//       </div>
//       <button className="select-button" onClick={() => handleSelectRoom(room)} >Select</button>
//     </div>
//   </div>
// );

// const RoomList = ({ rooms }) => (
//   <div className="room-list">
//     {rooms.map(room => <RoomCard key={room.id} room={room} />)}
//   </div>
// );

const ViewHotelDetails = () => {
  const location = useLocation();

  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { hotelId } = useParams();
  const { checkin, checkout, parent, children } = location.state || {};


    const navigate = useNavigate();

    // const handleSelectRoom = (roomDetails) => {
    //     navigate('/bookingPageNotLoggedIn', { 
    //         state: { 
    //             roomDetails, 
    //             hotelName: hotel.name, 
    //             checkin, 
    //             checkout, 
    //             parent, 
    //             children 
            
    //         } });
    // };

    const handleSelectRoom = (roomDetails) => {
        navigate('/bookingPageLoggedIn', { 
            state: { 
                roomDetails, 
                hotelName: hotel.name, 
                checkin, 
                checkout, 
                parent, 
                children 
            
            } });
    };

    const RoomList = ({ rooms, onSelect }) => (
        <div className="room-list">
          {rooms.map(room => <RoomCard key={room.id} room={room} onSelect={onSelect}/>)}
        </div>
      );

    const RoomCard = ({ room, onSelect}) => (
        <div className="room-card">
          <img src={room.images[0].url} alt={room.name} className="room-image" />
          <div className="room-details">
            <h3 className="room-name">{room.name}</h3>
            <div className="room-description" dangerouslySetInnerHTML={{ __html: room.description }} />
            <p className="room-info">{room.additionalInfo}</p>
            <p className="room-wifi">Free WiFi</p>
            <div className="room-price-details">
              <p className="room-price">SGD {room.price.toFixed(2)}</p>
              <p className="room-stay-info">1 night, 1 adult</p>
            </div>
            <button className="select-button" onClick={() => onSelect(room)} >Select</button>
          </div>
        </div>
      );


  useEffect(() => {
    const loadHotelData = async () => {
      try {
        setLoading(true);
        const data = await fetchStaticHotelData(hotelId);
        setHotel(data);
        setError(null);
      } catch (err) {
        console.error('Error in loadHotelData:', err);
        setError(`Failed to load hotel data: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    loadHotelData();
  }, [hotelId]);

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
      <div className="hotel-details">
        <header>
          <Navbar />
        </header>
  
        <div className="breadcrumb">
          <span>Hotels</span> / <span>{hotel.original_metadata.country}</span> / <span>{hotel.original_metadata.city}</span> / <span>2 Person 1 Room</span> / <span>24 Jul - 25 Jul</span>
        </div>
  
        <div className="hotel-card">
          <img 
            src={`${hotel.image_details.prefix}${hotel.default_image_index}${hotel.image_details.suffix}`} 
            alt={hotel.name} 
            className="hotel-image" 
          />
          <div className="hotel-info">
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
          <div className="main-content">
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
              <p>Popularity: {category.popularity.toFixed(2)}</p>
            </div>
          ))}
          </div>
        </section>

        <RoomList rooms={data.rooms} onSelect={handleSelectRoom} />
  
        <Footer />
      </div>
    );
  };
  
  export default ViewHotelDetails;