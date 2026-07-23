/* UK towns and cities dataset.
   Line format: nation;county;town;population
   nation = England / Scotland / Wales / Northern Ireland
   county = ceremonial county, council area or region
   town   = town or city
   pop    = approximate population */
const raw = `
England;Greater London;London;8900000
England;Greater London;Croydon;386000
England;Greater London;Ealing;341000
England;Greater London;Enfield;333000
England;Greater London;Barnet;389000
England;Greater London;Bromley;332000
England;Greater London;Hounslow;271000
England;Greater London;Newham;353000
England;Greater London;Wandsworth;329000
England;Greater London;Lambeth;318000
England;Greater London;Southwark;318000
England;Greater London;Lewisham;305000
England;Greater London;Redbridge;305000
England;Greater London;Havering;259000
England;Greater London;Hillingdon;306000
England;Greater London;Kingston upon Thames;177000
England;Greater London;Richmond;198000
England;Greater London;Harrow;251000
England;Greater Manchester;Manchester;553000
England;Greater Manchester;Salford;270000
England;Greater Manchester;Bolton;296000
England;Greater Manchester;Stockport;295000
England;Greater Manchester;Oldham;238000
England;Greater Manchester;Rochdale;223000
England;Greater Manchester;Wigan;327000
England;Greater Manchester;Bury;193000
England;Greater Manchester;Tameside;231000
England;Greater Manchester;Trafford;236000
England;West Midlands;Birmingham;1145000
England;West Midlands;Coventry;371000
England;West Midlands;Wolverhampton;263000
England;West Midlands;Dudley;313000
England;West Midlands;Walsall;284000
England;West Midlands;Solihull;217000
England;West Midlands;West Bromwich;103000
England;West Midlands;Sutton Coldfield;110000
England;West Yorkshire;Leeds;793000
England;West Yorkshire;Bradford;546000
England;West Yorkshire;Wakefield;353000
England;West Yorkshire;Huddersfield;162000
England;West Yorkshire;Halifax;88000
England;West Yorkshire;Dewsbury;62000
England;West Yorkshire;Keighley;56000
England;Merseyside;Liverpool;500000
England;Merseyside;Birkenhead;143000
England;Merseyside;St Helens;183000
England;Merseyside;Southport;91000
England;Merseyside;Bootle;51000
England;Merseyside;Wallasey;60000
England;South Yorkshire;Sheffield;584000
England;South Yorkshire;Rotherham;265000
England;South Yorkshire;Doncaster;311000
England;South Yorkshire;Barnsley;245000
England;Tyne and Wear;Newcastle upon Tyne;300000
England;Tyne and Wear;Sunderland;277000
England;Tyne and Wear;Gateshead;196000
England;Tyne and Wear;South Shields;75000
England;Tyne and Wear;Washington;67000
England;Nottinghamshire;Nottingham;337000
England;Nottinghamshire;Mansfield;110000
England;Nottinghamshire;Worksop;44000
England;Nottinghamshire;Newark-on-Trent;45000
England;Leicestershire;Leicester;368000
England;Leicestershire;Loughborough;61000
England;Leicestershire;Hinckley;46000
England;Leicestershire;Melton Mowbray;27000
England;Bristol;Bristol;467000
England;Somerset;Bath;94000
England;Somerset;Weston-super-Mare;76000
England;Somerset;Taunton;69000
England;Somerset;Yeovil;45000
England;Kent;Maidstone;114000
England;Kent;Canterbury;62000
England;Kent;Gillingham;108000
England;Kent;Dartford;98000
England;Kent;Margate;61000
England;Kent;Ashford;74000
England;Kent;Royal Tunbridge Wells;59000
England;Essex;Southend-on-Sea;183000
England;Essex;Colchester;122000
England;Essex;Chelmsford;120000
England;Essex;Basildon;107000
England;Essex;Harlow;87000
England;Surrey;Guildford;77000
England;Surrey;Woking;100000
England;Surrey;Epsom;80000
England;Hampshire;Southampton;253000
England;Hampshire;Portsmouth;238000
England;Hampshire;Basingstoke;113000
England;Hampshire;Winchester;45000
England;Hampshire;Aldershot;37000
England;Berkshire;Reading;174000
England;Berkshire;Slough;164000
England;Berkshire;Bracknell;84000
England;Berkshire;Maidenhead;71000
England;Berkshire;Windsor;32000
England;Oxfordshire;Oxford;162000
England;Oxfordshire;Banbury;54000
England;Oxfordshire;Bicester;33000
England;Buckinghamshire;Milton Keynes;288000
England;Buckinghamshire;High Wycombe;125000
England;Buckinghamshire;Aylesbury;60000
England;Hertfordshire;Watford;96000
England;Hertfordshire;Hemel Hempstead;97000
England;Hertfordshire;St Albans;83000
England;Hertfordshire;Stevenage;90000
England;Bedfordshire;Luton;218000
England;Bedfordshire;Bedford;106000
England;Cambridgeshire;Cambridge;146000
England;Cambridgeshire;Peterborough;215000
England;Norfolk;Norwich;213000
England;Norfolk;Great Yarmouth;99000
England;Norfolk;King's Lynn;46000
England;Suffolk;Ipswich;180000
England;Suffolk;Lowestoft;71000
England;Suffolk;Bury St Edmunds;41000
England;Lancashire;Preston;148000
England;Lancashire;Blackpool;139000
England;Lancashire;Blackburn;148000
England;Lancashire;Burnley;87000
England;Lancashire;Lancaster;52000
England;Cheshire;Warrington;210000
England;Cheshire;Chester;92000
England;Cheshire;Crewe;74000
England;Cheshire;Macclesfield;52000
England;Derbyshire;Derby;261000
England;Derbyshire;Chesterfield;104000
England;Derbyshire;Swadlincote;45000
England;Staffordshire;Stoke-on-Trent;258000
England;Staffordshire;Stafford;71000
England;Staffordshire;Burton upon Trent;76000
England;Lincolnshire;Lincoln;103000
England;Lincolnshire;Grimsby;88000
England;Lincolnshire;Scunthorpe;82000
England;Lincolnshire;Boston;46000
England;East Riding of Yorkshire;Kingston upon Hull;267000
England;East Riding of Yorkshire;Beverley;30000
England;North Yorkshire;York;211000
England;North Yorkshire;Harrogate;75000
England;North Yorkshire;Scarborough;61000
England;North Yorkshire;Middlesbrough;140000
England;County Durham;Durham;48000
England;County Durham;Darlington;93000
England;County Durham;Hartlepool;88000
England;County Durham;Stockton-on-Tees;85000
England;Northamptonshire;Northampton;225000
England;Northamptonshire;Kettering;56000
England;Northamptonshire;Corby;68000
England;Worcestershire;Worcester;103000
England;Worcestershire;Redditch;87000
England;Worcestershire;Kidderminster;57000
England;Warwickshire;Nuneaton;87000
England;Warwickshire;Rugby;78000
England;Warwickshire;Warwick;37000
England;Gloucestershire;Gloucester;130000
England;Gloucestershire;Cheltenham;117000
England;Dorset;Bournemouth;196000
England;Dorset;Poole;151000
England;Dorset;Weymouth;53000
England;Devon;Plymouth;264000
England;Devon;Exeter;130000
England;Devon;Torquay;65000
England;Cornwall;Truro;19000
England;Cornwall;St Austell;20000
England;Cornwall;Newquay;20000
England;Wiltshire;Swindon;185000
England;Wiltshire;Salisbury;41000
England;East Sussex;Brighton and Hove;277000
England;East Sussex;Eastbourne;101000
England;East Sussex;Hastings;91000
England;West Sussex;Crawley;118000
England;West Sussex;Worthing;111000
England;West Sussex;Chichester;27000
England;Cumbria;Carlisle;108000
England;Cumbria;Barrow-in-Furness;56000
England;Cumbria;Kendal;29000
England;Shropshire;Telford;170000
England;Shropshire;Shrewsbury;76000
England;Herefordshire;Hereford;60000
Scotland;Glasgow City;Glasgow;635000
Scotland;City of Edinburgh;Edinburgh;530000
Scotland;Aberdeen City;Aberdeen;200000
Scotland;Dundee City;Dundee;148000
Scotland;Fife;Kirkcaldy;50000
Scotland;Fife;Dunfermline;54000
Scotland;North Lanarkshire;Motherwell;33000
Scotland;North Lanarkshire;Cumbernauld;52000
Scotland;South Lanarkshire;Hamilton;54000
Scotland;South Lanarkshire;East Kilbride;75000
Scotland;Renfrewshire;Paisley;77000
Scotland;West Lothian;Livingston;57000
Scotland;Highland;Inverness;70000
Scotland;Stirling;Stirling;37000
Scotland;Falkirk;Falkirk;35000
Scotland;South Ayrshire;Ayr;46000
Scotland;East Ayrshire;Kilmarnock;46000
Scotland;Perth and Kinross;Perth;47000
Scotland;Moray;Elgin;25000
Scotland;Dumfries and Galloway;Dumfries;33000
Wales;Cardiff;Cardiff;362000
Wales;Swansea;Swansea;246000
Wales;Newport;Newport;159000
Wales;Wrexham;Wrexham;65000
Wales;Rhondda Cynon Taf;Aberdare;39000
Wales;Rhondda Cynon Taf;Pontypridd;33000
Wales;Bridgend;Bridgend;49000
Wales;Caerphilly;Caerphilly;41000
Wales;Flintshire;Flint;20000
Wales;Gwynedd;Bangor;18000
Wales;Carmarthenshire;Llanelli;44000
Wales;Carmarthenshire;Carmarthen;15000
Wales;Pembrokeshire;Haverfordwest;14000
Wales;Conwy;Llandudno;20000
Wales;Neath Port Talbot;Neath;51000
Northern Ireland;Belfast;Belfast;345000
Northern Ireland;County Antrim;Lisburn;45000
Northern Ireland;County Antrim;Ballymena;31000
Northern Ireland;County Antrim;Antrim;24000
Northern Ireland;County Down;Bangor;61000
Northern Ireland;County Down;Newtownards;29000
Northern Ireland;County Londonderry;Londonderry;85000
Northern Ireland;County Londonderry;Coleraine;25000
Northern Ireland;County Armagh;Craigavon;65000
Northern Ireland;County Armagh;Armagh;15000
Northern Ireland;County Tyrone;Omagh;20000
Northern Ireland;County Fermanagh;Enniskillen;14000
`;

export default raw;
