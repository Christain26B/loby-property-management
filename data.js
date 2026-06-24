/* =========================================================
   Loby Property Management — property data + renderers
   Single source of truth for listings + detail pages.
   ========================================================= */
(function () {
  "use strict";

  var IMG = "https://images.unsplash.com/";
  function img(id, w) { return IMG + id + "?auto=format&fit=crop&w=" + (w || 900) + "&q=74"; }

  // SVG snippets
  var SVG_PIN = '<svg viewBox="0 0 24 24" fill="none"><path d="M12 21s-7-4.4-7-10a7 7 0 0 1 14 0c0 5.6-7 10-7 10Z" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="11" r="2.2" stroke="currentColor" stroke-width="1.8"/></svg>';
  var SVG_UNITS = '<svg viewBox="0 0 24 24" fill="none"><path d="M4 20V6l8-3 8 3v14" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>';
  var SVG_CHECK = '<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.6"/><path d="m8.5 12 2.5 2.5 4.5-5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  // Master amenity pool (subset chosen per property)
  // Floor plans: {name, type, beds, baths, sqft, rent, avail} (avail: number available or 0 = waitlist)

  var P = [
    {
      id: "wilshire-collection", name: "The Wilshire Collection", hood: "Mid-Wilshire", hoodKey: "midwilshire",
      address: "3540 Wilshire Blvd, Los Angeles, CA 90010", units: 180, year: 2016, parking: "Gated garage",
      pets: "Cats & dogs welcome", beds: "Studio–2 BR", baths: "1–2 BA", sqft: "480–1,150", rent: "$2,450–$4,200",
      from: "$2,450", status: "avail",
      hero: "photo-1568822240459-9400e58f710f",
      gallery: ["photo-1568822240459-9400e58f710f", "photo-1502672260266-1c1ef2d93688", "photo-1556912172-45b7abe8b7e1", "photo-1522050212171-61b01dd24579", "photo-1502005229762-cf1b2da7c5d6"],
      blurb: ["Rising at the heart of the Miracle Mile, The Wilshire Collection brings hotel-inspired living to one of LA's most central addresses. Floor-to-ceiling windows frame skyline and Hollywood Hills views, while a rooftop deck and resident lounge make the most of the California light.",
        "Steps from LACMA, the Petersen, and the Metro Purple Line, residents trade the car for a five-minute walk to museums, dining, and a one-seat ride downtown."],
      amenities: ["Rooftop sky deck", "Resident lounge", "Fitness center", "Pool & spa", "Co-working space", "Controlled access", "EV charging", "In-unit laundry", "Package room"],
      plans: [
        { name: "The Fairfax", type: "Studio", beds: 0, baths: 1, sqft: "480–560", rent: "$2,450", avail: 3 },
        { name: "The Mansfield", type: "1 Bed", beds: 1, baths: 1, sqft: "640–740", rent: "$3,050", avail: 5 },
        { name: "The Highland", type: "2 Bed", beds: 2, baths: 2, sqft: "980–1,150", rent: "$4,200", avail: 1 }
      ]
    },
    {
      id: "vermont-sunset", name: "Vermont & Sunset", hood: "East Hollywood", hoodKey: "hwd",
      address: "1500 N Vermont Ave, Los Angeles, CA 90027", units: 220, year: 2019, parking: "On-site garage",
      pets: "Pet friendly", beds: "Studio–3 BR", baths: "1–2 BA", sqft: "510–1,320", rent: "$2,195–$4,600",
      from: "$2,195", status: "avail",
      hero: "photo-1781484966813-7a7dd4d305cd",
      gallery: ["photo-1781484966813-7a7dd4d305cd", "photo-1560448204-e02f11c3d0e2", "photo-1556911220-bff31c812dba", "photo-1493809842364-78817add7ffb", "photo-1571902943202-507ec2618e8f"],
      blurb: ["Vermont & Sunset sits atop the Metro Red Line at the gateway to Los Feliz, Thai Town, and the studios of East Hollywood. It's our most connected community — a true transit-first address where Hollywood, Downtown, and Universal City are minutes away.",
        "Inside, warm wood tones and an expansive courtyard create calm above the buzz, with a podium pool deck and a ground-floor café that anchors the neighborhood."],
      amenities: ["Courtyard & pool deck", "24/7 fitness center", "Ground-floor café", "Bike storage", "Smart home locks", "Controlled access", "EV charging", "Pet spa", "In-unit laundry"],
      plans: [
        { name: "The Edgemont", type: "Studio", beds: 0, baths: 1, sqft: "510–580", rent: "$2,195", avail: 6 },
        { name: "The Hillhurst", type: "1 Bed", beds: 1, baths: 1, sqft: "650–780", rent: "$2,750", avail: 8 },
        { name: "The Griffith", type: "2 Bed", beds: 2, baths: 2, sqft: "1,000–1,180", rent: "$3,900", avail: 2 },
        { name: "The Observatory", type: "3 Bed", beds: 3, baths: 2, sqft: "1,240–1,320", rent: "$4,600", avail: 1 }
      ]
    },
    {
      id: "arts-district-lofts", name: "Arts District Lofts", hood: "Downtown LA", hoodKey: "dtla",
      address: "668 S Mateo St, Los Angeles, CA 90021", units: 140, year: 2014, parking: "Assigned garage",
      pets: "Pet friendly", beds: "Loft–2 BR", baths: "1–2 BA", sqft: "620–1,480", rent: "$2,800–$5,100",
      from: "$2,800", status: "wait",
      hero: "photo-1581977567059-03bc2c3a5c31",
      gallery: ["photo-1581977567059-03bc2c3a5c31", "photo-1493809842364-78817add7ffb", "photo-1556912172-45b7abe8b7e1", "photo-1502672260266-1c1ef2d93688", "photo-1571902943202-507ec2618e8f"],
      blurb: ["A converted 1920s warehouse in the heart of the Arts District, these authentic lofts pair 14-foot ceilings, exposed brick, and steel-sash windows with a thoughtfully modern build-out. It's creative-class living surrounded by galleries, roasters, and some of the city's best restaurants.",
        "A landmark address that rarely has availability — join the waitlist to be first in line when a loft opens."],
      amenities: ["Exposed-brick lofts", "Rooftop terrace", "Maker / art studio", "Fitness center", "Controlled access", "Bike storage", "EV charging", "In-unit laundry", "Package room"],
      plans: [
        { name: "Live/Work Loft", type: "Loft", beds: 0, baths: 1, sqft: "620–820", rent: "$2,800", avail: 0 },
        { name: "The Mateo", type: "1 Bed", beds: 1, baths: 1, sqft: "880–1,050", rent: "$3,650", avail: 0 },
        { name: "The Mill", type: "2 Bed", beds: 2, baths: 2, sqft: "1,250–1,480", rent: "$5,100", avail: 0 }
      ]
    },
    {
      id: "koreatown-gateway", name: "Koreatown Gateway", hood: "Koreatown", hoodKey: "ktown",
      address: "3450 W 6th St, Los Angeles, CA 90020", units: 260, year: 2021, parking: "Gated garage",
      pets: "Cats & dogs welcome", beds: "Studio–2 BR", baths: "1–2 BA", sqft: "470–1,090", rent: "$2,050–$3,700",
      from: "$2,050", status: "avail",
      hero: "photo-1716657721912-48bc33857bc9",
      gallery: ["photo-1716657721912-48bc33857bc9", "photo-1560448204-e02f11c3d0e2", "photo-1556911220-bff31c812dba", "photo-1522050212171-61b01dd24579", "photo-1502005229762-cf1b2da7c5d6"],
      blurb: ["Our largest community, Koreatown Gateway is a brand-new high-rise in the most vibrant, walkable corner of LA. Twenty-four-hour dining, nightlife, and two Metro lines sit right outside the lobby — and the amenity deck rivals any hotel in the city.",
        "With 260 homes and a dedicated on-site team, Gateway always has options across studios to two-bedrooms, and renters love the value for the location."],
      amenities: ["Resort pool & cabanas", "Sky lounge", "24/7 fitness center", "Co-working space", "Golf simulator", "Pet spa", "EV charging", "Controlled access", "In-unit laundry"],
      plans: [
        { name: "The Wilton", type: "Studio", beds: 0, baths: 1, sqft: "470–540", rent: "$2,050", avail: 9 },
        { name: "The Ardmore", type: "1 Bed", beds: 1, baths: 1, sqft: "620–720", rent: "$2,600", avail: 12 },
        { name: "The Serrano", type: "2 Bed", beds: 2, baths: 2, sqft: "960–1,090", rent: "$3,700", avail: 4 }
      ]
    },
    {
      id: "reservoir-row", name: "Reservoir Row", hood: "Silver Lake", hoodKey: "silverlake",
      address: "2700 Glendale Blvd, Los Angeles, CA 90039", units: 72, year: 2018, parking: "Tuck-under parking",
      pets: "Pet friendly", beds: "1–2 BR", baths: "1–2 BA", sqft: "680–1,200", rent: "$2,650–$4,300",
      from: "$2,650", status: "avail",
      hero: "photo-1634274640375-d37a256cd6cb",
      gallery: ["photo-1634274640375-d37a256cd6cb", "photo-1522708323590-d24dbb6b0267", "photo-1556912172-45b7abe8b7e1", "photo-1502672260266-1c1ef2d93688", "photo-1486406146926-c627a92ad1ab"],
      blurb: ["A boutique, design-forward community a block from the Silver Lake Reservoir and the Sunset Junction. Reservoir Row is intentionally small — 72 homes — so the courtyard, rooftop, and resident events feel personal.",
        "Expect chef's kitchens, oversized windows, and a walkable life among the coffee shops, boutiques, and farmers' market that define east-side living."],
      amenities: ["Rooftop deck", "Landscaped courtyard", "Fitness studio", "Chef's kitchens", "Bike storage", "EV charging", "Smart home locks", "In-unit laundry", "Controlled access"],
      plans: [
        { name: "The Junction", type: "1 Bed", beds: 1, baths: 1, sqft: "680–820", rent: "$2,650", avail: 2 },
        { name: "The Reservoir", type: "2 Bed", beds: 2, baths: 2, sqft: "1,020–1,200", rent: "$4,300", avail: 2 }
      ]
    },
    {
      id: "culver-junction", name: "Culver Junction", hood: "Culver City", hoodKey: "culver",
      address: "9300 Washington Blvd, Culver City, CA 90232", units: 154, year: 2020, parking: "Gated garage",
      pets: "Pet friendly", beds: "Studio–2 BR", baths: "1–2 BA", sqft: "500–1,160", rent: "$2,575–$4,400",
      from: "$2,575", status: "wait",
      hero: "photo-1643906652169-a750f3f70848",
      gallery: ["photo-1643906652169-a750f3f70848", "photo-1493809842364-78817add7ffb", "photo-1556911220-bff31c812dba", "photo-1522050212171-61b01dd24579", "photo-1564013799919-ab600027ffc6"],
      blurb: ["At the center of Culver City's tech and studio boom, Culver Junction puts Apple, Amazon Studios, HBO, and the Expo Line within a short stroll. It's built for the modern commute — or no commute at all, with generous work-from-home spaces.",
        "Downtown Culver's restaurants and the Platform shopping district are minutes away, making this one of our most in-demand Westside addresses."],
      amenities: ["Pool & sundeck", "Co-working lounge", "24/7 fitness center", "Conference room", "Pet spa", "EV charging", "Controlled access", "Bike storage", "In-unit laundry"],
      plans: [
        { name: "The Helms", type: "Studio", beds: 0, baths: 1, sqft: "500–580", rent: "$2,575", avail: 0 },
        { name: "The Ince", type: "1 Bed", beds: 1, baths: 1, sqft: "660–790", rent: "$3,150", avail: 0 },
        { name: "The Platform", type: "2 Bed", beds: 2, baths: 2, sqft: "990–1,160", rent: "$4,400", avail: 0 }
      ]
    },
    {
      id: "echo-park-commons", name: "Echo Park Commons", hood: "Echo Park", hoodKey: "echo",
      address: "1430 Sunset Blvd, Los Angeles, CA 90026", units: 96, year: 2017, parking: "Subterranean parking",
      pets: "Pet friendly", beds: "1–2 BR", baths: "1–2 BA", sqft: "640–1,140", rent: "$2,395–$3,900",
      from: "$2,395", status: "avail",
      hero: "photo-1643665592005-843f3f6b4ece",
      gallery: ["photo-1643665592005-843f3f6b4ece", "photo-1522708323590-d24dbb6b0267", "photo-1556912172-45b7abe8b7e1", "photo-1493809842364-78817add7ffb", "photo-1515896769750-31548aa180ed"],
      blurb: ["A laid-back community overlooking Echo Park Lake, with the lotus blossoms, paddle boats, and Sunday farmers' market just down the hill. Echo Park Commons captures the easy, creative energy of one of LA's most beloved neighborhoods.",
        "Walk to Dodger Stadium, the cafés of Echo Park Avenue, and the indie shops of Sunset Boulevard from a home that feels both connected and tucked away."],
      amenities: ["Lake-view roof deck", "Courtyard", "Fitness studio", "Resident lounge", "Bike storage", "EV charging", "Controlled access", "In-unit laundry", "Package room"],
      plans: [
        { name: "The Lotus", type: "1 Bed", beds: 1, baths: 1, sqft: "640–760", rent: "$2,395", avail: 4 },
        { name: "The Boathouse", type: "2 Bed", beds: 2, baths: 2, sqft: "980–1,140", rent: "$3,900", avail: 2 }
      ]
    },
    {
      id: "highland-park-row", name: "Highland Park Row", hood: "Highland Park", hoodKey: "highland",
      address: "5650 N Figueroa St, Los Angeles, CA 90042", units: 64, year: 2019, parking: "Gated parking",
      pets: "Pet friendly", beds: "Studio–2 BR", baths: "1–2 BA", sqft: "490–1,080", rent: "$2,250–$3,600",
      from: "$2,250", status: "avail",
      hero: "photo-1779431085067-b7a78f485afa",
      gallery: ["photo-1779431085067-b7a78f485afa", "photo-1560448204-e02f11c3d0e2", "photo-1556911220-bff31c812dba", "photo-1502005229762-cf1b2da7c5d6", "photo-1502672260266-1c1ef2d93688"],
      blurb: ["Right on Figueroa in the thick of Highland Park's celebrated dining and music scene, Highland Park Row is a boutique community for people who want character, value, and a true neighborhood feel on the rising northeast side.",
        "The Gold Line, vintage shops, and some of the best tacos in the city are all within a few blocks of the front door."],
      amenities: ["Rooftop deck", "Courtyard", "Fitness studio", "Resident lounge", "Bike storage", "EV charging", "Controlled access", "In-unit laundry", "Smart home locks"],
      plans: [
        { name: "The York", type: "Studio", beds: 0, baths: 1, sqft: "490–560", rent: "$2,250", avail: 2 },
        { name: "The Figueroa", type: "1 Bed", beds: 1, baths: 1, sqft: "630–740", rent: "$2,750", avail: 3 },
        { name: "The Avenue", type: "2 Bed", beds: 2, baths: 2, sqft: "950–1,080", rent: "$3,600", avail: 1 }
      ]
    },
    {
      id: "mar-vista-gardens", name: "Mar Vista Gardens", hood: "Mar Vista", hoodKey: "marvista",
      address: "12500 Venice Blvd, Los Angeles, CA 90066", units: 110, year: 2015, parking: "Garage parking",
      pets: "Pet friendly", beds: "1–3 BR", baths: "1–2 BA", sqft: "700–1,420", rent: "$2,700–$4,800",
      from: "$2,700", status: "avail",
      hero: "photo-1554219028-2fdc7cc305ca",
      gallery: ["photo-1554219028-2fdc7cc305ca", "photo-1502005229762-cf1b2da7c5d6", "photo-1556912172-45b7abe8b7e1", "photo-1522050212171-61b01dd24579", "photo-1493809842364-78817add7ffb"],
      blurb: ["A low-rise, garden-style community on the Westside, Mar Vista Gardens is built around lush landscaping and sun-filled courtyards — a quieter, family-friendly alternative just minutes from Venice Beach and the Mar Vista farmers' market.",
        "Larger floor plans, including rare three-bedrooms, make it a favorite for those who want space and beach-adjacent living without high-rise density."],
      amenities: ["Garden courtyards", "Pool & spa", "Fitness center", "Children's play area", "BBQ & picnic areas", "EV charging", "Controlled access", "In-unit laundry", "Extra storage"],
      plans: [
        { name: "The Grand View", type: "1 Bed", beds: 1, baths: 1, sqft: "700–820", rent: "$2,700", avail: 3 },
        { name: "The Palms", type: "2 Bed", beds: 2, baths: 2, sqft: "1,000–1,200", rent: "$3,800", avail: 2 },
        { name: "The Centinela", type: "3 Bed", beds: 3, baths: 2, sqft: "1,300–1,420", rent: "$4,800", avail: 1 }
      ]
    },
    {
      id: "spring-street-lofts", name: "Spring Street Lofts", hood: "Downtown LA", hoodKey: "dtla",
      address: "650 S Spring St, Los Angeles, CA 90014", units: 128, year: 2013, parking: "Valet & garage",
      pets: "Pet friendly", beds: "Loft–2 BR", baths: "1–2 BA", sqft: "600–1,360", rent: "$2,725–$4,900",
      from: "$2,725", status: "avail",
      hero: "photo-1744509636454-7b7d179b6d23",
      gallery: ["photo-1744509636454-7b7d179b6d23", "photo-1493809842364-78817add7ffb", "photo-1556912172-45b7abe8b7e1", "photo-1502672260266-1c1ef2d93688", "photo-1515896769750-31548aa180ed"],
      blurb: ["In the heart of the Historic Core, Spring Street Lofts occupies a restored Beaux-Arts bank building on the Spring Street 'Wall Street of the West.' Soaring ceilings, original detailing, and a marble lobby meet a modern rooftop pool with skyline views.",
        "The Broad, Grand Central Market, and the Financial District are all a short walk away in LA's most walkable district."],
      amenities: ["Rooftop pool", "Historic marble lobby", "24/7 fitness center", "Resident lounge", "Co-working space", "Valet parking", "EV charging", "Controlled access", "In-unit laundry"],
      plans: [
        { name: "The Vault Loft", type: "Loft", beds: 0, baths: 1, sqft: "600–780", rent: "$2,725", avail: 5 },
        { name: "The Broadway", type: "1 Bed", beds: 1, baths: 1, sqft: "820–980", rent: "$3,400", avail: 4 },
        { name: "The Spring", type: "2 Bed", beds: 2, baths: 2, sqft: "1,150–1,360", rent: "$4,900", avail: 2 }
      ]
    },
    {
      id: "beverly-western", name: "Beverly & Western", hood: "Koreatown", hoodKey: "ktown",
      address: "175 N Western Ave, Los Angeles, CA 90004", units: 144, year: 2022, parking: "Gated garage",
      pets: "Cats & dogs welcome", beds: "Studio–2 BR", baths: "1–2 BA", sqft: "460–1,050", rent: "$2,150–$3,500",
      from: "$2,150", status: "avail",
      hero: "photo-1768507908561-958d40c30b79",
      gallery: ["photo-1768507908561-958d40c30b79", "photo-1560448204-e02f11c3d0e2", "photo-1556911220-bff31c812dba", "photo-1502005229762-cf1b2da7c5d6", "photo-1564013799919-ab600027ffc6"],
      blurb: ["One of our newest communities, Beverly & Western is a sleek 2022 build on the border of Koreatown and Larchmont. Smart-home everything, a resort pool, and a top-floor sky lounge make it feel brand-new in every way — because it is.",
        "Quick access to Hollywood, Hancock Park, and Larchmont Village's village-style shopping puts the best of central LA in easy reach."],
      amenities: ["Resort pool & cabanas", "Sky lounge", "Smart home everything", "24/7 fitness center", "Co-working space", "Pet spa", "EV charging", "Controlled access", "In-unit laundry"],
      plans: [
        { name: "The Larchmont", type: "Studio", beds: 0, baths: 1, sqft: "460–540", rent: "$2,150", avail: 7 },
        { name: "The Oxford", type: "1 Bed", beds: 1, baths: 1, sqft: "610–730", rent: "$2,650", avail: 6 },
        { name: "The Windsor", type: "2 Bed", beds: 2, baths: 2, sqft: "920–1,050", rent: "$3,500", avail: 3 }
      ]
    },
    {
      id: "sunset-junction-flats", name: "Sunset Junction Flats", hood: "Silver Lake", hoodKey: "silverlake",
      address: "3900 Sunset Blvd, Los Angeles, CA 90029", units: 88, year: 2018, parking: "Tuck-under parking",
      pets: "Pet friendly", beds: "1–2 BR", baths: "1–2 BA", sqft: "660–1,150", rent: "$2,600–$4,100",
      from: "$2,600", status: "wait",
      hero: "photo-1651752523215-9bf678c29355",
      gallery: ["photo-1651752523215-9bf678c29355", "photo-1522708323590-d24dbb6b0267", "photo-1556912172-45b7abe8b7e1", "photo-1502672260266-1c1ef2d93688", "photo-1486406146926-c627a92ad1ab"],
      blurb: ["Sitting right on the Sunset Junction, these flats put you in the middle of Silver Lake's best stretch of restaurants, vintage shops, and coffee bars. A rooftop with downtown views and a leafy courtyard balance the energy of the street below.",
        "It's a compact, highly walkable community that fills quickly — join the waitlist to get the next available flat."],
      amenities: ["Rooftop deck", "Courtyard", "Fitness studio", "Resident lounge", "Bike storage", "EV charging", "Smart home locks", "Controlled access", "In-unit laundry"],
      plans: [
        { name: "The Sunset", type: "1 Bed", beds: 1, baths: 1, sqft: "660–800", rent: "$2,600", avail: 0 },
        { name: "The Junction", type: "2 Bed", beds: 2, baths: 2, sqft: "980–1,150", rent: "$4,100", avail: 0 }
      ]
    }
  ];

  // ---- Renderers ----
  function statusTag(p) {
    return p.status === "avail"
      ? '<span class="tag avail">Now leasing</span>'
      : '<span class="tag">Waitlist</span>';
  }

  function cardHTML(p) {
    return (
      '<a class="prop-card reveal" data-hood="' + p.hoodKey + '" href="property.html?id=' + p.id + '">' +
        '<div class="ph">' + statusTag(p) + '<img src="' + img(p.hero, 800) + '" alt="' + p.name + '" loading="lazy" /></div>' +
        '<div class="body">' +
          '<span class="loc">' + SVG_PIN + " " + p.hood + "</span>" +
          "<h3>" + p.name + "</h3>" +
          '<div class="meta">' +
            "<span>" + SVG_UNITS + " " + p.units + " homes</span>" +
            "<span>" + p.beds + "</span>" +
            '<span class="price">' + p.from + '<small>/mo+</small></span>' +
          "</div>" +
        "</div>" +
      "</a>"
    );
  }

  function renderGrid(elId, list) {
    var el = document.getElementById(elId);
    if (!el) return;
    el.innerHTML = list.map(cardHTML).join("");
  }

  function renderDetail() {
    var root = document.getElementById("detail-root");
    if (!root) return;
    var id = new URLSearchParams(location.search).get("id");
    var p = P.filter(function (x) { return x.id === id; })[0] || P[0];
    document.title = p.name + " — Loby Property Management";

    // One real cover photo per community; remaining slots are honest
    // "Coming soon" placeholders (we don't reuse stock interiors across buildings).
    var thumbs = '<button class="active" aria-label="' + p.name + ' exterior"><img src="' + img(p.hero, 360) + '" alt="' + p.name + '" /></button>';
    for (var ti = 0; ti < 4; ti++) {
      thumbs += '<div class="soon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" stroke-width="1.5"/><circle cx="8.5" cy="10" r="1.5" stroke="currentColor" stroke-width="1.4"/><path d="m4 18 5-5 4 4 3-3 4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg><span>Coming soon</span></div>';
    }

    var amen = p.amenities.map(function (a) {
      return "<li>" + SVG_CHECK + "<span>" + a + "</span></li>";
    }).join("");

    var plans = p.plans.map(function (f) {
      var availTxt = f.avail > 0 ? f.avail + " available" : "Join waitlist";
      var availCls = f.avail > 0 ? "in" : "wl";
      var btn = f.avail > 0
        ? '<a class="btn btn-primary" href="#tour">Check availability</a>'
        : '<a class="btn btn-ghost" href="#tour">Join waitlist</a>';
      return (
        '<div class="fp">' +
          '<div class="fp-name">' + f.name + "<span>" + f.type + "</span></div>" +
          '<div class="fp-cell"><div class="k">Bed / Bath</div><div class="v">' + f.beds + " bd · " + f.baths + " ba</div></div>" +
          '<div class="fp-cell"><div class="k">Size</div><div class="v">' + f.sqft + ' ft²</div></div>' +
          '<div class="fp-cell"><div class="k">Starting</div><div class="fp-rent">' + f.rent + '<small style="font-family:var(--sans);font-size:.7rem;color:var(--muted);font-weight:500;">/mo</small></div></div>' +
          '<div class="fp-avail ' + availCls + '">' + availTxt + "</div>" +
          btn +
        "</div>"
      );
    }).join("");

    var mapSrc = "https://www.google.com/maps?q=" + encodeURIComponent(p.address) + "&output=embed";
    var statusBadge = p.status === "avail"
      ? '<span class="status-badge avail">Now leasing</span>'
      : '<span class="status-badge wait">Waitlist open</span>';

    // Similar: same hood (excl self), else fill from others
    var similar = P.filter(function (x) { return x.hoodKey === p.hoodKey && x.id !== p.id; });
    P.forEach(function (x) { if (similar.length < 3 && x.id !== p.id && similar.indexOf(x) === -1) similar.push(x); });
    similar = similar.slice(0, 3);

    root.innerHTML =
      '<section class="detail-head"><div class="wrap">' +
        '<div class="breadcrumb"><a href="index.html">Home</a> · <a href="properties.html">Communities</a> · ' + p.name + "</div>" +
        '<div class="top">' +
          "<div>" + statusBadge +
            '<h1 style="margin-top:.5rem;">' + p.name + "</h1>" +
            '<div class="loc">' + SVG_PIN + " " + p.hood + ", Los Angeles</div>" +
            '<div class="addr">' + p.address + "</div>" +
          "</div>" +
          '<div class="price-tag"><div class="lbl">Starting from</div><div class="val">' + p.from + '<small style="font-family:var(--sans);font-size:.9rem;color:var(--muted);font-weight:500;"> /mo</small></div>' +
            '<div class="detail-actions" style="justify-content:flex-end;"><a class="btn btn-primary" href="#tour">Schedule a tour</a><a class="btn btn-ghost" href="#plans">View floor plans</a></div>' +
          "</div>" +
        "</div>" +
      "</div></section>" +

      '<section class="gallery"><div class="wrap">' +
        '<div class="gallery-main"><img id="gallery-hero" src="' + img(p.hero, 1300) + '" alt="' + p.name + '" /></div>' +
        '<div class="gallery-thumbs">' + thumbs + "</div>" +
      "</div></section>" +

      '<section style="padding-top:8px;"><div class="wrap">' +
        '<div class="facts">' +
          '<div class="fact"><div class="ft-l">Homes</div><div class="ft-v">' + p.units + "</div></div>" +
          '<div class="fact"><div class="ft-l">Bedrooms</div><div class="ft-v">' + p.beds + "</div></div>" +
          '<div class="fact"><div class="ft-l">Bathrooms</div><div class="ft-v">' + p.baths + "</div></div>" +
          '<div class="fact"><div class="ft-l">Size</div><div class="ft-v">' + p.sqft + ' ft²</div></div>' +
          '<div class="fact"><div class="ft-l">Built</div><div class="ft-v">' + p.year + "</div></div>" +
          '<div class="fact"><div class="ft-l">Parking</div><div class="ft-v" style="font-size:.95rem;">' + p.parking + "</div></div>" +
        "</div>" +

        '<div class="detail-grid">' +
          '<div class="detail-main">' +
            '<div class="detail-section"><h2>About this community</h2>' + p.blurb.map(function (b) { return "<p>" + b + "</p>"; }).join("") +
              '<p style="color:var(--ink);font-weight:600;display:flex;gap:1.4rem;flex-wrap:wrap;align-items:center;margin-top:.4rem;">' +
                '<span style="display:inline-flex;align-items:center;gap:.45rem;"><span style="width:8px;height:8px;border-radius:50%;background:var(--accent);display:inline-block;"></span>' + p.pets + "</span>" +
                '<span style="display:inline-flex;align-items:center;gap:.45rem;"><span style="width:8px;height:8px;border-radius:50%;background:var(--accent);display:inline-block;"></span>' + p.parking + "</span>" +
              "</p></div>" +
            '<div class="detail-section" id="plans"><h2>Floor plans &amp; availability</h2><div class="fp-list">' + plans + "</div></div>" +
            '<div class="detail-section"><h2>Amenities</h2><ul class="amenity-grid">' + amen + "</ul></div>" +
            '<div class="detail-section"><h2>Location</h2><p>' + p.address + '</p><div class="map-frame"><iframe loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="' + mapSrc + '" title="Map of ' + p.name + '"></iframe></div></div>' +
          "</div>" +

          '<aside><div class="tour-card" id="tour"><h3>Schedule a tour</h3><p class="muted">See ' + p.name + " in person — same-day tours often available.</p>" +
            '<div class="ph">(669) 303-7340</div>' +
            '<form data-demo><div class="form-ok">Thanks! Your tour request for ' + p.name + " is confirmed — our leasing team will reach out shortly to lock in a time.</div>" +
              '<div class="field"><label>Full name</label><input type="text" placeholder="Jane Doe" required /></div>' +
              '<div class="field"><label>Email</label><input type="email" placeholder="jane@email.com" required /></div>' +
              '<div class="field"><label>Phone</label><input type="tel" placeholder="(213) 555-0123" /></div>' +
              '<div class="field"><label>Move-in timing</label><select><option>As soon as possible</option><option>Within 30 days</option><option>1–2 months</option><option>Just browsing</option></select></div>' +
              '<button class="btn btn-primary btn-lg" type="submit" style="width:100%;">Request tour</button>' +
            "</form></div></aside>" +
        "</div>" +
      "</div></section>" +

      '<section class="similar bg-cream2"><div class="wrap">' +
        '<div class="section-head reveal"><span class="eyebrow">You might also like</span><h2>Similar communities</h2></div>' +
        '<div class="prop-grid">' + similar.map(cardHTML).join("") + "</div>" +
      "</div></section>";
  }

  // Swap gallery hero image
  window.lobySwapHero = function (src, idx) {
    var hero = document.getElementById("gallery-hero");
    if (hero) hero.src = src;
    var btns = document.querySelectorAll(".gallery-thumbs button");
    btns.forEach(function (b, i) { b.classList.toggle("active", String(i) === String(idx)); });
  };

  // Expose
  window.LobyData = {
    properties: P,
    render: function () {
      renderGrid("featured-grid", P.slice(0, 6));
      renderGrid("prop-grid", P);
      renderDetail();
    }
  };
})();
