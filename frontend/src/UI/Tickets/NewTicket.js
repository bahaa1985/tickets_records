import { React, useState, useEffect, Fragment } from "react";
import { useForm } from "react-hook-form";
import createTicket from "./TicketApi.js";

export const NewTicket = () => {
  const [tickets, setTickets] = useState([]);
  const [departureDate, setDepartureDate] = useState(Date.now());
  const [returnDate, setReturnDate] = useState(null);
  const [fromAirports, setFromAirports] = useState([]);
  const [toAirports, setToAirports] = useState([]);
  const [selectedFromAirport, setSelectedFromAirport] = useState(0);
  const [selectedToAirport, setSelectedToAirport] = useState("");

  const [passengersFields, setPassengersFields] = useState([{ name: "", mobile: "" }]);
  const [flightType, setFlightType] = useState(0);

  const [transporters, setTransporters] = useState([]);
  const [selectedTransporter, setSelectedTransporter] = useState("");

  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState("");

  const [price, setPrice] = useState(0);
  const [salePrice, setSalePrice] = useState(0);
  const [payed, setPayed] = useState(0);
  const [remain, setRemain] = useState(salePrice - payed);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    const fetchAirports = async () => {
      const res = await fetch("/airports");
      const data = await res.json();
      setFromAirports(data);
      setToAirports(data);
    };
    const fetchTransporters = async () => {
      const res = await fetch("/transporters");
      const data = await res.json();
      setTransporters(data);
      setSelectedTransporter(data[0]._id); // Set default transporter
    };

    const fetchCompanies = async () => {
      const res = await fetch("/companies");
      const data = await res.json();
      setCompanies(data);
      setSelectedCompany(data[0]._id); // Set default company
    };

    fetchAirports();
    fetchTransporters();
    fetchCompanies();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    const bookingDate = new Date();

    const flights = [
      {
        flightType: flightType === 0 ? "oneWay" : "roundTrip",
        depAirportId: selectedFromAirport,
        arrAirportId: selectedToAirport,
        transporterId: selectedTransporter,
      },
    ];

    const ticket = {
      // ticket object holds all ticket data to send to /tickets endpoint POST
      passengers: passengersFields.map((passenger) => ({
        passengerName: passenger.name,
        passengerMobile: passenger.mobile,
      })),
      bookingDate: bookingDate,
      departureDate: departureDate,
      returnDate: returnDate,
      flights: flights,
      transporterId: selectedTransporter,
      companyId: selectedCompany,
      price: price,
      salePrice: salePrice,
      payed: payed,
      remain: remain,
      employeeId: "123456789",
      notes: notes,
      status:'تم'
    };
    // console.log(ticket);
    createTicket(
      ticket.passengers,
      ticket.bookingDate,
      ticket.departureDate,
      ticket.returnDate,
      ticket.flights,
      ticket.companyId,
      ticket.price,
      ticket.salePrice,
      ticket.payed,
      ticket.remain,
      ticket.employeeId,
      notes
    )
      .then((data) => {
        console.log(data);
        if (data) {
          console.log("Response status:", data.status);
        }
        // setTickets([...tickets, data]);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  function handleAddPassengers(handleType) {
    if (handleType === "add") {
      setPassengersFields([...passengersFields, { name: "", mobile: "" }]);
    } else if (handleType === "remove") {
      setPassengersFields(passengersFields.filter((_, index) => index !== passengersFields.length - 1));
    }
  }

  const handleFlightTypeChange = (value) => {
    setFlightType(value);
  };

  const handleToAirport = (value) => {
    if (value !== -1) {
      setSelectedFromAirport(value);
      setToAirports(fromAirports.filter((airport) => airport.name !== value));
    }
  };

  return (
    <div dir="rtl" className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-center mb-6">Booking</h1>
      <form onSubmit={(e) => createTicket(e)} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
        {/* Choose flight type */}
        <div className="space-y-4">
          <label className="block text-lg font-medium">نوع الرحلة:</label>
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2">
              <input
                id="oneWayradio"
                type="radio"
                defaultChecked={true}
                checked={flightType === 0}
                onChange={() => handleFlightTypeChange(0)}
                className="form-radio"
              />
              <span>رحلة ذهاب</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                id="roundTripradio"
                type="radio"
                defaultChecked={false}
                checked={flightType === 1}
                onChange={() => handleFlightTypeChange(1)}
                className="form-radio"
              />
              <span>رحلة ذهاب و عودة</span>
            </label>
          </div>
          <div className="space-y-2">
            <label className="block">
              تاريخ المغادرة
              <input
                id="deaprtureDate"
                type="date"
                onChange={(e) => setDepartureDate(e.target.value)}
                className="block w-full mt-1 p-2 border rounded-md"
              />
            </label>
            {flightType === 1 && (
              <label className="block">
                تاريخ العودة
                <input
                  id="returnDate"
                  type="date"
                  onChange={(e) => setReturnDate(e.target.value)}
                  className="block w-full mt-1 p-2 border rounded-md"
                />
              </label>
            )}
          </div>
        </div>
        {/* From and to airports */}
        <div className="space-y-4">
          <label className="block">
            From:
            <select
              onChange={(e) => handleToAirport(e.target.value)}
              value={selectedFromAirport}
              className="block w-full mt-1 p-2 border rounded-md"
            >
              <option value={-1}>اختر مطار</option>
              {fromAirports.map((airport, index) => (
                <option key={index} value={airport.code}>
                  {airport.name}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            To:
            <select
              onChange={(e) => setSelectedToAirport(e.target.value)}
              value={selectedToAirport}
              className="block w-full mt-1 p-2 border rounded-md"
            >
              <option value={-1}>اختر مطار</option>
              {toAirports.map((airport, index) => (
                <option key={index} value={airport.code}>
                  {airport.name}
                </option>
              ))}
            </select>
          </label>
        </div>
        {/* Passengers */}
        <div className="space-y-4">
          {passengersFields.map((field, index) => (
            <div key={index} className="flex space-x-4">
              <input
                type="text"
                placeholder="اسم الراكب"
                onChange={(e) => (passengersFields[index].name = e.target.value)}
                className="flex-1 p-2 border rounded-md"
              />
              <input
                type="text"
                placeholder="رقم الموبايل"
                onChange={(e) => (passengersFields[index].mobile = e.target.value)}
                className="flex-1 p-2 border rounded-md"
              />
            </div>
          ))}
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => handleAddPassengers("add")}
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              إضافة راكب
            </button>
            <button
              type="button"
              onClick={() => handleAddPassengers("remove")}
              className="px-4 py-2 bg-red-500 text-white rounded-md"
            >
              حذف راكب
            </button>
          </div>
        </div>
        {/* Aviation */}
        <div className="space-y-4">
          <label className="block">
            شركة الطيران
            <select
              onChange={(e) => [setSelectedTransporter(e.target.value), console.log(selectedTransporter)]}
              value={selectedTransporter}
              className="block w-full mt-1 p-2 border rounded-md"
            >
              {transporters.map((transporter, index) => (
                <option key={index} value={transporter._id}>
                  {transporter.name}
                </option>
              ))}
            </select>
          </label>
        </div>
        {/* Agency */}
        <div className="space-y-4">
          <label className="block">
            شركة الحجز
            <select
              onChange={(e) => [setSelectedCompany(e.target.value), console.log(selectedCompany)]}
              value={selectedCompany}
              className="block w-full mt-1 p-2 border rounded-md"
            >
              {companies.map((company, index) => (
                <option key={index} value={company._id}>
                  {company.name}
                </option>
              ))}
            </select>
          </label>
        </div>
        {/* Fund */}
        <div className="space-y-4">
          <label className="block">
            سعر التكلفة
            <input
              type="text"
              placeholder="سعر التكلفة"
              onChange={(e) => setPrice(parseInt(e.target.value))}
              className="block w-full mt-1 p-2 border rounded-md"
            />
          </label>
          <label className="block">
            سعر البيع
            <input
              type="text"
              placeholder="سعر البيع"
              onChange={(e) => setSalePrice(parseInt(e.target.value))}
              className="block w-full mt-1 p-2 border rounded-md"
            />
          </label>
          <label className="block">
            المبلغ المدفوع
            <input
              type="text"
              placeholder="المبلغ المدفوع"
              onChange={(e) => setPayed(parseInt(e.target.value))}
              className="block w-full mt-1 p-2 border rounded-md"
            />
          </label>
          <label className="block">
            المتبقى
            <input
              type="text"
              placeholder="المتبقى"
              value={remain}
              className="block w-full mt-1 p-2 border rounded-md"
            />
          </label>
        </div>
        {/* Notes */}
        <div className="space-y-4">
          <input
            type="text"
            placeholder="ملاحظات"
            onChange={(e) => setNotes(e.target.value)}
            className="block w-full mt-1 p-2 border rounded-md"
          />
        </div>
        {/* Submit */}
        <button
          type="submit"
          onClick={(e) => handleSubmit(e)}
          className="w-full py-2 bg-green-500 text-white rounded-md"
        >
          تسجيل
        </button>
      </form>
    </div>
  );
};