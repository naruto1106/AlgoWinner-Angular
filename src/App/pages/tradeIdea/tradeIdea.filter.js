agmNgModuleWrapper('agmp.tradeIdea')
    .defineController('p.tradeIdea.FilterController', ['$scope'],
        function ($scope) {
            var vm = this;
            $scope.customTemplate = {};
            $scope.proprietaryFilter = {};
            $scope.universeFilter = {};
            $scope.customTempText = { buttonDefaultText: 'Choose Template' };
            $scope.proprietaryText = { buttonDefaultText: 'Choose Filter' };
            $scope.universeText = { buttonDefaultText: 'Choose Universe' };
            $scope.countryText = { buttonDefaultText: 'Choose Country' };
            $scope.sectorText = { buttonDefaultText: 'Choose Sector' };
            $scope.SelectedText = { dynamicButtonTextSuffix:'Selected'}
            $scope.eventsCallback = {
                onItemSelect: function (item) {
                    console.log("Item Got Selected: ", item);
                }
            };
            $scope.dropdownSetting = {
                smartButtonMaxItems: 1,
                smartButtonTextConverter: function (itemText, originalItem) { return itemText; },
                selectionLimit: 1,
                showUncheckAll: false,
                closeOnSelect: true,
                scrollable: false,
                displayProp: 'name'
            };
            $scope.dropdownCheckbox = {
                showUncheckAll: false,
                showCheckAll: false,
                displayProp: 'name'
            };
            $scope.data = {
                Templates: [
                    { id: '1', name: 'User Template 1' },
                    { id: '2', name: 'User Template 2' },
                    { id: '3', name: 'User Template 3' }
                ],
                Filters: [
                    { id: '1', name: 'Properietary Filter 1' },
                    { id: '2', name: 'Properietary Filter 2' },
                    { id: '3', name: 'Properietary Filter 3' }
                ],
                uninverse: [
                    { id: '111', name: 'Market' },
                    { id: '112', name: 'Watchlist' },
                    { id: '113', name: 'Index' }
                ],
                countries: [
                    { name: "Afghanistan", code: "AF", id: 0 },
                    { name: "Åland Islands", code: "AX", id: 1 },
                    { name: "Albania", code: "AL", id: 2 },
                    { name: "Algeria", code: "DZ", id: 3 },
                    { name: "American Samoa", code: "AS", id: 4 },
                    { name: "AndorrA", code: "AD", id: 5 },
                    { name: "Angola", code: "AO", id: 6 },
                    { name: "Anguilla", code: "AI", id: 7 },
                    { name: "Antarctica", code: "AQ", id: 8 },
                    { name: "Antigua and Barbuda", code: "AG", id: 9 },
                    { name: "Argentina", code: "AR", id: 10 },
                    { name: "Armenia", code: "AM", id: 11 },
                    { name: "Aruba", code: "AW", id: 12 },
                    { name: "Australia", code: "AU", id: 13 },
                    { name: "Austria", code: "AT", id: 14 },
                    { name: "Azerbaijan", code: "AZ", id: 15 },
                    { name: "Bahamas", code: "BS", id: 16 },
                    { name: "Bahrain", code: "BH", id: 17 },
                    { name: "Bangladesh", code: "BD", id: 18 },
                    { name: "Barbados", code: "BB", id: 19 },
                    { name: "Belarus", code: "BY", id: 20 },
                    { name: "Belgium", code: "BE", id: 21 },
                    { name: "Belize", code: "BZ", id: 22 },
                    { name: "Benin", code: "BJ", id: 23 },
                    { name: "Bermuda", code: "BM", id: 24 },
                    { name: "Bhutan", code: "BT", id: 25 },
                    { name: "Bolivia", code: "BO", id: 26 },
                    { name: "Bosnia and Herzegovina", code: "BA", id: 27 },
                    { name: "Botswana", code: "BW", id: 28 },
                    { name: "Bouvet Island", code: "BV", id: 29 },
                    { name: "Brazil", code: "BR", id: 30 },
                    { name: "British Indian Ocean Territory", code: "IO", id: 31 },
                    { name: "Brunei Darussalam", code: "BN", id: 32 },
                    { name: "Bulgaria", code: "BG", id: 33 },
                    { name: "Burkina Faso", code: "BF", id: 34 },
                    { name: "Burundi", code: "BI", id: 35 },
                    { name: "Cambodia", code: "KH", id: 36 },
                    { name: "Cameroon", code: "CM", id: 37 },
                    { name: "Canada", code: "CA", id: 38 },
                    { name: "Cape Verde", code: "CV", id: 39 },
                    { name: "Cayman Islands", code: "KY", id: 40 },
                    { name: "Central African Republic", code: "CF", id: 41 },
                    { name: "Chad", code: "TD", id: 42 },
                    { name: "Chile", code: "CL", id: 43 },
                    { name: "China", code: "CN", id: 44 },
                    { name: "Christmas Island", code: "CX", id: 45 },
                    { name: "Cocos (Keeling) Islands", code: "CC", id: 46 },
                    { name: "Colombia", code: "CO", id: 47 },
                    { name: "Comoros", code: "KM", id: 48 },
                    { name: "Congo", code: "CG", id: 49 },
                    { name: "Congo, The Democratic Republic of the", code: "CD", id: 50 },
                    { name: "Cook Islands", code: "CK", id: 51 },
                    { name: "Costa Rica", code: "CR", id: 52 },
                    { name: "Cote D'Ivoire", code: "CI", id: 53 },
                    { name: "Croatia", code: "HR", id: 54 },
                    { name: "Cuba", code: "CU", id: 55 },
                    { name: "Cyprus", code: "CY", id: 56 },
                    { name: "Czech Republic", code: "CZ", id: 57 },
                    { name: "Denmark", code: "DK", id: 58 },
                    { name: "Djibouti", code: "DJ", id: 59 },
                    { name: "Dominica", code: "DM", id: 60 },
                    { name: "Dominican Republic", code: "DO", id: 61 },
                    { name: "Ecuador", code: "EC", id: 62 },
                    { name: "Egypt", code: "EG", id: 63 },
                    { name: "El Salvador", code: "SV", id: 64 },
                    { name: "Equatorial Guinea", code: "GQ", id: 65 },
                    { name: "Eritrea", code: "ER", id: 66 },
                    { name: "Estonia", code: "EE", id: 67 },
                    { name: "Ethiopia", code: "ET", id: 68 },
                    { name: "Falkland Islands (Malvinas)", code: "FK", id: 69 },
                    { name: "Faroe Islands", code: "FO", id: 70 },
                    { name: "Fiji", code: "FJ", id: 71 },
                    { name: "Finland", code: "FI", id: 72 },
                    { name: "France", code: "FR", id: 73 },
                    { name: "French Guiana", code: "GF", id: 74 },
                    { name: "French Polynesia", code: "PF", id: 75 },
                    { name: "French Southern Territories", code: "TF", id: 76 },
                    { name: "Gabon", code: "GA", id: 77 },
                    { name: "Gambia", code: "GM", id: 78 },
                    { name: "Georgia", code: "GE", id: 79 },
                    { name: "Germany", code: "DE", id: 80 },
                    { name: "Ghana", code: "GH", id: 81 },
                    { name: "Gibraltar", code: "GI", id: 82 },
                    { name: "Greece", code: "GR", id: 83 },
                    { name: "Greenland", code: "GL", id: 84 },
                    { name: "Grenada", code: "GD", id: 85 },
                    { name: "Guadeloupe", code: "GP", id: 86 },
                    { name: "Guam", code: "GU", id: 87 },
                    { name: "Guatemala", code: "GT", id: 88 },
                    { name: "Guernsey", code: "GG", id: 89 },
                    { name: "Guinea", code: "GN", id: 90 },
                    { name: "Guinea-Bissau", code: "GW", id: 91 },
                    { name: "Guyana", code: "GY", id: 92 },
                    { name: "Haiti", code: "HT", id: 93 },
                    { name: "Heard Island and Mcdonald Islands", code: "HM", id: 94 },
                    { name: "Holy See (Vatican City State)", code: "VA", id: 95 },
                    { name: "Honduras", code: "HN", id: 96 },
                    { name: "Hong Kong", code: "HK", id: 97 },
                    { name: "Hungary", code: "HU", id: 98 },
                    { name: "Iceland", code: "IS", id: 99 },
                    { name: "India", code: "IN", id: 100 },
                    { name: "Indonesia", code: "ID", id: 101 },
                    { name: "Iran, Islamic Republic Of", code: "IR", id: 102 },
                    { name: "Iraq", code: "IQ", id: 103 },
                    { name: "Ireland", code: "IE", id: 104 },
                    { name: "Isle of Man", code: "IM", id: 105 },
                    { name: "Israel", code: "IL", id: 106 },
                    { name: "Italy", code: "IT", id: 107 },
                    { name: "Jamaica", code: "JM", id: 108 },
                    { name: "Japan", code: "JP", id: 109 },
                    { name: "Jersey", code: "JE", id: 110 },
                    { name: "Jordan", code: "JO", id: 111 },
                    { name: "Kazakhstan", code: "KZ", id: 112 },
                    { name: "Kenya", code: "KE", id: 113 },
                    { name: "Kiribati", code: "KI", id: 114 },
                    { name: "Korea, Democratic People'S Republic of", code: "KP", id: 115 },
                    { name: "Korea, Republic of", code: "KR", id: 116 },
                    { name: "Kuwait", code: "KW", id: 117 },
                    { name: "Kyrgyzstan", code: "KG", id: 118 },
                    { name: "Lao People'S Democratic Republic", code: "LA", id: 119 },
                    { name: "Latvia", code: "LV", id: 120 },
                    { name: "Lebanon", code: "LB", id: 121 },
                    { name: "Lesotho", code: "LS", id: 122 },
                    { name: "Liberia", code: "LR", id: 123 },
                    { name: "Libyan Arab Jamahiriya", code: "LY", id: 124 },
                    { name: "Liechtenstein", code: "LI", id: 125 },
                    { name: "Lithuania", code: "LT", id: 126 },
                    { name: "Luxembourg", code: "LU", id: 127 },
                    { name: "Macao", code: "MO", id: 128 },
                    { name: "Macedonia, The Former Yugoslav Republic of", code: "MK", id: 129 },
                    { name: "Madagascar", code: "MG", id: 130 },
                    { name: "Malawi", code: "MW", id: 131 },
                    { name: "Malaysia", code: "MY", id: 132 },
                    { name: "Maldives", code: "MV", id: 133 },
                    { name: "Mali", code: "ML", id: 134 },
                    { name: "Malta", code: "MT", id: 135 },
                    { name: "Marshall Islands", code: "MH", id: 136 },
                    { name: "Martinique", code: "MQ", id: 137 },
                    { name: "Mauritania", code: "MR", id: 138 },
                    { name: "Mauritius", code: "MU", id: 139 },
                    { name: "Mayotte", code: "YT", id: 140 },
                    { name: "Mexico", code: "MX", id: 141 },
                    { name: "Micronesia, Federated States of", code: "FM", id: 142 },
                    { name: "Moldova, Republic of", code: "MD", id: 143 },
                    { name: "Monaco", code: "MC", id: 144 },
                    { name: "Mongolia", code: "MN", id: 145 },
                    { name: "Montserrat", code: "MS", id: 146 },
                    { name: "Morocco", code: "MA", id: 147 },
                    { name: "Mozambique", code: "MZ", id: 148 },
                    { name: "Myanmar", code: "MM", id: 149 },
                    { name: "Namibia", code: "NA", id: 150 },
                    { name: "Nauru", code: "NR", id: 151 },
                    { name: "Nepal", code: "NP", id: 152 },
                    { name: "Netherlands", code: "NL", id: 153 },
                    { name: "Netherlands Antilles", code: "AN", id: 154 },
                    { name: "New Caledonia", code: "NC", id: 155 },
                    { name: "New Zealand", code: "NZ", id: 156 },
                    { name: "Nicaragua", code: "NI", id: 157 },
                    { name: "Niger", code: "NE", id: 158 },
                    { name: "Nigeria", code: "NG", id: 159 },
                    { name: "Niue", code: "NU", id: 160 },
                    { name: "Norfolk Island", code: "NF", id: 161 },
                    { name: "Northern Mariana Islands", code: "MP", id: 162 },
                    { name: "Norway", code: "NO", id: 163 },
                    { name: "Oman", code: "OM", id: 164 },
                    { name: "Pakistan", code: "PK", id: 165 },
                    { name: "Palau", code: "PW", id: 166 },
                    { name: "Palestinian Territory, Occupied", code: "PS", id: 167 },
                    { name: "Panama", code: "PA", id: 168 },
                    { name: "Papua New Guinea", code: "PG", id: 169 },
                    { name: "Paraguay", code: "PY", id: 170 },
                    { name: "Peru", code: "PE", id: 171 },
                    { name: "Philippines", code: "PH", id: 172 },
                    { name: "Pitcairn", code: "PN", id: 173 },
                    { name: "Poland", code: "PL", id: 174 },
                    { name: "Portugal", code: "PT", id: 175 },
                    { name: "Puerto Rico", code: "PR", id: 176 },
                    { name: "Qatar", code: "QA", id: 177 },
                    { name: "Reunion", code: "RE", id: 178 },
                    { name: "Romania", code: "RO", id: 179 },
                    { name: "Russian Federation", code: "RU", id: 180 },
                    { name: "RWANDA", code: "RW", id: 181 },
                    { name: "Saint Helena", code: "SH", id: 182 },
                    { name: "Saint Kitts and Nevis", code: "KN", id: 183 },
                    { name: "Saint Lucia", code: "LC", id: 184 },
                    { name: "Saint Pierre and Miquelon", code: "PM", id: 185 },
                    { name: "Saint Vincent and the Grenadines", code: "VC", id: 186 },
                    { name: "Samoa", code: "WS", id: 187 },
                    { name: "San Marino", code: "SM", id: 188 },
                    { name: "Sao Tome and Principe", code: "ST", id: 189 },
                    { name: "Saudi Arabia", code: "SA", id: 190 },
                    { name: "Senegal", code: "SN", id: 191 },
                    { name: "Serbia and Montenegro", code: "CS", id: 192 },
                    { name: "Seychelles", code: "SC", id: 193 },
                    { name: "Sierra Leone", code: "SL", id: 194 },
                    { name: "Singapore", code: "SG", id: 195 },
                    { name: "Slovakia", code: "SK", id: 196 },
                    { name: "Slovenia", code: "SI", id: 197 },
                    { name: "Solomon Islands", code: "SB", id: 198 },
                    { name: "Somalia", code: "SO", id: 199 },
                    { name: "South Africa", code: "ZA", id: 200 },
                    { name: "South Georgia and the South Sandwich Islands", code: "GS", id: 201 },
                    { name: "Spain", code: "ES", id: 202 },
                    { name: "Sri Lanka", code: "LK", id: 203 },
                    { name: "Sudan", code: "SD", id: 204 },
                    { name: "Suriname", code: "SR", id: 205 },
                    { name: "Svalbard and Jan Mayen", code: "SJ", id: 206 },
                    { name: "Swaziland", code: "SZ", id: 207 },
                    { name: "Sweden", code: "SE", id: 208 },
                    { name: "Switzerland", code: "CH", id: 209 },
                    { name: "Syrian Arab Republic", code: "SY", id: 210 },
                    { name: "Taiwan, Province of China", code: "TW", id: 211 },
                    { name: "Tajikistan", code: "TJ", id: 212 },
                    { name: "Tanzania, United Republic of", code: "TZ", id: 213 },
                    { name: "Thailand", code: "TH", id: 214 },
                    { name: "Timor-Leste", code: "TL", id: 215 },
                    { name: "Togo", code: "TG", id: 216 },
                    { name: "Tokelau", code: "TK", id: 217 },
                    { name: "Tonga", code: "TO", id: 218 },
                    { name: "Trinidad and Tobago", code: "TT", id: 219 },
                    { name: "Tunisia", code: "TN", id: 220 },
                    { name: "Turkey", code: "TR", id: 221 },
                    { name: "Turkmenistan", code: "TM", id: 222 },
                    { name: "Turks and Caicos Islands", code: "TC", id: 223 },
                    { name: "Tuvalu", code: "TV", id: 224 },
                    { name: "Uganda", code: "UG", id: 225 },
                    { name: "Ukraine", code: "UA", id: 226 },
                    { name: "United Arab Emirates", code: "AE", id: 227 },
                    { name: "United Kingdom", code: "GB", id: 228 },
                    { name: "United States", code: "US", id: 229 },
                    { name: "United States Minor Outlying Islands", code: "UM", id: 230 },
                    { name: "Uruguay", code: "UY", id: 231 },
                    { name: "Uzbekistan", code: "UZ", id: 232 },
                    { name: "Vanuatu", code: "VU", id: 233 },
                    { name: "Venezuela", code: "VE", id: 234 },
                    { name: "Viet Nam", code: "VN", id: 235 },
                    { name: "Virgin Islands, British", code: "VG", id: 236 },
                    { name: "Virgin Islands, U.S.", code: "VI", id: 237 },
                    { name: "Wallis and Futuna", code: "WF", id: 238 },
                    { name: "Western Sahara", code: "EH", id: 239 },
                    { name: "Yemen", code: "YE", id: 240 },
                    { name: "Zambia", code: "ZM", id: 241 },
                    { name: "Zimbabwe", code: "ZW", id: 242 }
                ],
                sectors: [
                    { id: '1', name: 'Healthcare' },
                    { id: '2', name: 'Energy' },
                    { id: '3', name: 'Communication' }
                ],
                industries: [
                    { id: '1', name: 'Biotechnology' },
                    { id: '2', name: 'Software Application' },
                    { id: '3', name: 'Oil & Gas' }
                ],
            }
            $scope.toggleTableView = toggleTableView;
            $scope.getOption = getOption;
            $scope.showPagination = showPagination;
            $scope.viewType = "table";
            $scope.templateType = "standard";
            $scope.selectedUniverse;
            $scope.selectedCountry = {};
            $scope.selectedSector = [];
            $scope.selectedIndustry = [];
            $scope.showCountry = false;
            $scope.showSector = false;
            $scope.industryFilter = false;
            $scope.currentPage = 1;

            function getTotalItems() {
                return 50;
            }

            function showPagination() {
                // return vm.models.numPages > 1;
                return true;
            }

            function getOption(option, value) {
                console.log(option)
                console.log(value)
                switch (option) {

                    case 'Universe':
                        value ? $scope.showCountry = true : $scope.showCountry = false;
                        break;

                    case 'Country':
                        value ? $scope.showSector = true : $scope.showSector = false;
                        break;


                    case 'Sector':
                        value ? $scope.industryFilter = true : $scope.industryFilter = false;
                        break;
                    default:
                    // code block
                }
            };

            function toggleTableView(viewType) {
                $scope.viewType = viewType;
            };


        }).defineDirectiveForE('agmp-tradeidea-filter', [],
            function () {
                return {
                    controller: "p.tradeIdea.FilterController",
                    templateUrl: '/App/pages/tradeIdea/tradeIdea.filter.html'
                };
            },
            {
            });