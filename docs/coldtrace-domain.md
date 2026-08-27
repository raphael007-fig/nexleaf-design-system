# ColdTrace — domain reference

> Compiled for Claude from Nexleaf's Confluence (Service Desk + Product spaces) — 57 pages read.
> Purpose: ground design work in how ColdTrace actually works — entities, terminology, roles,
> flows, statuses and real field failure modes. Live-platform audit findings are appended below
> over time. No real facility names, contacts or personal data are recorded here, by policy.

## Source: Confluence (Service Desk + Product)
*Built from the Nexleaf Confluence "Nexleaf Service Desk" space (key SIS) plus two pages in the "Product" space. Page titles are cited inline. Facility names, contact names and phone numbers have been generalised.*

---

## 1. What ColdTrace is

ColdTrace is Nexleaf Analytics' **low-cost remote temperature monitoring (RTM) system for refrigerators that store vaccines and other temperature-sensitive products** ("Introduction to CT5 and its functionality"). It has two core components: a **hardware device** installed at a health facility that reads temperature from probes/sensors inside cold chain equipment and "sends alerts via SMS (text message) and email when temperatures get too hot or too cold, or when the power goes out"; and **"A secure web-based dashboard that allows remote access to real-time temperature and provides customizable analytics and report-generating tools to track performance"** (same page).

The dashboard is aimed at government cold-chain staff: **"A secure, cloud-based platform giving Ministry of Health staff remote access to near real-time temperature and power data"**, with **"Customizable analytics and report-generating tools to track equipment performance"** so that the information "is easy to access and interpret, facilitating crucial decision-making such as resource allocation and back-up equipment distribution" ("Coldtrace dashboard and configuration").

The stated mission framing: **"Vaccines maintain potency by being stored at the appropriate temperature at all the immunization sites in the country"** and "Equity in access to safe and effective vaccines to all children" ("Introduction to CT5 and its functionality"). Day-to-day users are health facility workers/nurses (who receive SMS alerts and act on them), maintenance technicians and installers (who install, troubleshoot and replace hardware), and district/provincial/national managers and EPI staff (who consume escalated alerts and weekly/monthly reports). Nexleaf runs a support desk (email, Jira Service Desk portal, WhatsApp) behind all of it.

Sibling product on the same codebase: **StoveTrace** (stovetrace.org), which monitors cooking stoves in households instead of CCEs in facilities — many dashboard articles are written as parallel ColdTrace/StoveTrace instructions.

---

## 2. Entities and relationships

### Hardware entities

**RTMD (Remote Temperature Monitoring Device)** — the generic term for the installed logger/base station. Two generations plus a transport logger:

- **CT5 / ColdTrace5** — wall-mounted device with **four wired sensor ports: "Sensor ports -A,B,C,D"**. Physical anatomy listed as: "Antenna, Front Display, Buzzer Speakers, Stop Alarm button, Cycle Display button, Function button, Sensor ports -A,B,C,D, Back panel, Wall Hanger" ("Introduction to CT5 and its functionality"). Contains an **SD card** (stores config + data; files include `apn.ini`, `thermal.ini`) and **1–2 SIM cards** ("The CT5 needs only 1 SIM to function. The second SIM is optional."). Identified by a **15-digit IMEI** printed on a label on the back ("How to find the IMEI of CT5 RTMD"). Has a rechargeable battery (replaceable) and a **RESET** hole on the side.
- **CTX** — newer **base station** that pairs wirelessly. "The base station connects to the temperature and door sensors via bluetooth. It displays the temperature and humidity for the sensors and sounds an alarm when the temperature gets too hot or too cold. The base station can connect to the internet via WiFi *or* cellular data. Its *battery is rechargeable* and *lasts 7 days when disconnected from power*" ("Know about CTX, Temperature Sensor and Door Sensor"). Identified by a **15-digit IMEI**; **"The last 6 digits is the Base Station ID"**, which is what appears on the device screen and is used to search the platform ("How to find the IMEI of a CTX base station"). Takes a **micro SIM**.
- **Trek** — a small Bluetooth logger read by a phone app; historically used for StoveTrace/stoves and for transport. On the dashboard, **"If you are using a Trek device, only sensor A is valid"** ("Replace a Device"). Samples "once every 10 mins" by default ("StoveTrace Data API"). Can be woken with a magnet ("Trek Device is not detected by nearby phone").
- **ColdTrace Transport** — a Bluetooth transport sensor + Android app ("ColdTrace Transport" is a distinct device type in the support portal). Has an **ON/OFF button**, an **LED status indicator**, and is identified by **MAC address**.

**Temperature Sensor (TS)** — for CTX, a wireless BLE sensor: "The temperature sensor records the temperature and humidity of a walk-in cold room, fridge, or freezer. It transmits data to the base station every minute… The *sensor batteries are non-rechargeable but last up to 7 years*" ("Know about CTX…"). Identified by a **12-digit alphanumeric MAC**; **"The last 6 digits of alpha numeric MAC will show up on the base station"** ("How to find the MAC address of a Temperature Sensor"). For CT5, "sensor" instead means a **wired sensor cable + probe** plugged into ports A–D; cables may be **colour-coded** and must be matched to same-coloured ports ("Sensor Installation", "Replace a Sensor on the CT5").

**Door Sensor** — "The door sensor and Magnet used to track and monitor when the door is opened and closed of a cold room or fridge/freezer" ("Know about CTX…"). Pairs to the CTX like a temperature sensor; installed as a sensor + magnet pair; powered by attaching an internal power connector ("How to turn ON a Door Sensor").

**Ambient sensor** — a sensor designated as measuring room (not CCE) temperature. In the install flow: **"Click on Ambient if you want to add it as an ambient sensor"** ("Configure a RTMD on the ColdTrace dashboard"). On CT5 installation, the 4th sensor is deliberately left outside the fridge ("Plug the 4th sensor (85mm/1m) in logger and leave it outside the ILR") ("Sensor Installation"). CTX also reports an onboard **"T - Ambient Temperature"**.

**Accessories** — antenna (must point up), power adapter/charger, stabilizer (voltage), extension board, sensor clips, double-sided tape, security/triangle screwdriver, drill toolkit ("Base Station Installation", "Installation Toolkit").

### Domain/data entities

**CCE (Cold Chain Equipment)** — the fridge/freezer/cold room being monitored, called **"Equipment"** in dashboard nav and **"CCE"** in flows. Equipment creation fields (`* = required`) from "Create a new Equipment or Stove":
`Equipment Make/Model*`, `Serial Number`, `Funding Source`, `Group*`, `Device*`, `Device Sensor*`, `Facility*`, `Power Source (Equipment)`, `Shared (Power Source)`, `ColdTrace Power Source`, `Installation Year`, `Utilization Status*`, `Working Status*`.
Newer inventory model ("EqMIS - Inventory Management Page") lists per-CCE: `Make and Model`, `Equipment Type`, `Facility it is located in`, `Serial Number`, `Functional Status`, `Install Date`, `Power Source`. Each CCE has **"a dedicated profile page, providing all the CCE information and its RTM association history."**

**Facility** — the health facility. Creation fields: `Facility Name*`, `Facility Identifier`, `Contact Name`, `Contact Phone Number`, `Group*`, `Equipment` ("Create a new Facility or Household"). Editable info: "Facility Name, Facility ID, Contact Name, Contact Phone Number, Group associations, Equipment associations" ("Edit Household or Facility Information"). The newer flow is thinner: **"Enter facility name and select region for the facility and click on Save"** ("How to create a Facility"). A user can mark one facility as their own default: **"Set this as my primary facility"** ("How to set a facility as your primary facility"). A facility owns a list of **contacts** ("Manage contact of a facility").

**Household** — the StoveTrace analogue of Facility (`Facility Name (Household Name)*` etc.).

**Group / Region** — the administrative hierarchy. Groups are **tree-structured**: you either create "a new TOP LEVEL group" or "a new group WITH A PARENT" via **"Add child group"** ("Create a new Group"). Group editable fields: `Name`, `Timezone`, `Administrators`, `Users`, `Parent Group`, `Default Gateway`, `Gateways`, `Equipment` ("Edit a Group"). The demo describes "a group called 'California' … with administrative levels (Province/District)" ("Coldtrace dashboard and configuration"). Newer UI calls the same concept **Region** ("Region and Facilities", "Select Region"). Groups carry the **timezone used for data queries**: "The queries on the data are run using the timezone of the group" ("StoveTrace Data API").

**Contact** — a person/number that receives alerts. Created under **Manage → Contacts → Create contact** ("How to create contact"). Contacts attach at two levels: to a **facility** ("Add contact from coldtrace" / "Remove") and to a **device** ("Device contacts" → "Add contact" / "Remove"). Contacts are searched by **name or phone number**. Recommended workaround: "we recommend creating a contact for the phone number that the SMS are coming from using the facility name as the contact information" ("SMS and Escalation Alerts").

**User** — a dashboard login. Fields: `Username*`, `User Type (Admin/Staff)*`, `First Name*`, `Last Name*`, `Email*`, `Phone`, `Password*`, `Confirm Password*`, `Admin Group Membership`, `User Group Membership`, `Timezone*`, `Language*`, `Default Group`, `Comments` ("Create a new user"). `Default Group` is "the group which should be displayed upon log in… Even if it is only 1 group, it should be selected."

**Device (dashboard record)** — the RTMD as a database object, distinct from the physical unit. Editable: `IMEI`, `Serial Number`, `Device Type`, `Power Source`, `Working Status`, `Utilization Status` ("Edit Device Information"). Searchable by `Device ID` or `Device Name`.

**Device association / Association History** — the join between a **Device+sensor port** and a **CCE**, with dates. The equipment detail page has an **"Association Histories"** section with **"Remove Current Device"** (red) and **"Replace Current Device"** (blue) ("Remove a Device Association", "Replace a Device"). Newer UI: **"Replace Active Device"** with `device IMEI`, `sensor`, `start date` ("How to replace a device/sensor").

**Installation** — a workflow object created via **Installations → Install RTMD**, with a `Configuration date`, a facility, contacts, and one or more sensor↔CCE configurations, ending in "Done" ("CTX Installation Flow…", "Configure a RTMD on the ColdTrace dashboard").

**Reading / temperature data** — time-series samples per sensor. CTX TS transmits to base station **every minute**; Trek samples **every 10 minutes**. API export columns: `date` (with timezone offset), `temp` (Celsius), `batt`, `battplugged` ("StoveTrace Data API").

**Alarm / Alert / excursion** — see §6. Thresholds are configured **"per sensor and group"**; a sensor-level value **overrides** the group default ("Coldtrace dashboard and configuration").

**Subscription** — the mapping of a person to an alert or report stream: "Escalated alerts" subscriptions and "Weekly reports / Monthly reports" subscriptions, each with create/view/update/delete ("Coldtrace dashboard and configuration").

**Gateway** — a group-level field (`Default Gateway`, `Gateways`) implying SMS gateway routing per group ("Edit a Group"). Not documented further.

### Relationship summary

```
Group/Region (tree: parent → child)
 ├── Users (User Group Membership / Admin Group Membership; Default Group)
 ├── Alarm threshold defaults ("view group configuration")
 ├── Timezone, Gateways
 └── Facility
      ├── Contacts (facility-level)
      └── CCE / Equipment  (Make/Model, Serial, Type, Power Source, Install Date, statuses)
            └── Device Association (Device + sensor slot + start/end date)  →  RTMD
                                                                              ├── CT5: wired sensor cable+probe in port A/B/C/D
                                                                              └── CTX base station (IMEI / Base Station ID)
                                                                                    ├── Temperature Sensor (MAC)  — BLE, 1 min
                                                                                    └── Door Sensor (+ magnet)
RTMD ── Device Contacts ── Contact ── SMS device alerts
Group ── Escalated alert subscription / Weekly+Monthly report subscription ── Contact/User
```

---

## 3. Terminology and acronyms

| Term | Meaning |
|---|---|
| **RTM** | Remote Temperature Monitoring ("low-cost remote temperature monitoring (RTM) system") |
| **RTMD** | Remote Temperature Monitoring Device — the dashboard's generic name for CT5/CTX ("Install RTMD", "RTMD IMEI or MAC") |
| **CT5 / ColdTrace5** | The wired 4-port logger generation |
| **CTX** | The newer BLE base-station generation |
| **TS** | Temperature Sensor (CTX wireless sensor) |
| **Base Station** | The CTX; also used generically for "the wall-mounted device" in "Base Station Installation" (which is actually about CT5) |
| **Base Station ID** | Last 6 digits of the CTX IMEI, shown on screen as `b-739779` |
| **CCE** | Cold Chain Equipment (fridge/freezer/cold room). Called **Equipment** in nav, **CCE** in flows |
| **CCEM** | Cold Chain Equipment Management — the old blue nav menu containing Facility / Equipment / Device |
| **EqMIS / EQMIS** | Equipment Management Information System — the inventory management module |
| **ILR** | Ice-Lined Refrigerator |
| **DF** | Deep Freezer |
| **WIC / WIF** | Walk-In Cold room / Walk-In Freezer |
| **HCW** | Health Care Worker (facility staff present at installation) |
| **CCH** | Cold Chain Handler ("Request the CCH to clear the ILR") |
| **EPI** | Expanded Programme on Immunization (implied user community; MoH staff) |
| **Excursion** | A temperature breach — "cold excursion" (too cold) and "hot excursion" (too hot) |
| **Device alert** | SMS sent by the device itself to facility staff |
| **Escalated alert** | Dashboard-generated summary of unresolved issues, sent to managers |
| **Force upload** | Manually triggering the device to push queued data |
| **Service Mode** | CT5 maintenance boot state (Function button held during power-on) |
| **Restore Factory Settings** | CT5: "bringing it in 'service mode' and then reset" — clears all configuration |
| **Factory Reset** | CTX: erases all recorded data *and* app-configured Wi-Fi settings |
| **APN** | Access Point Name — per-carrier data setting stored in `apn.ini` / `thermal.ini` on the CT5 SD card |
| **MCC / MNC** | Mobile Country Code / Mobile Network Code, used to look up the APN |
| **Sw / Sc** | CTX screen labels: **"Sw - WiFi Signal , Sc - Cellular Signal"** |
| **Fb / Fw** | CTX firmware versions: `Fb` = base station firmware, `Fw` = sensor firmware |
| **LogMe** | Field app used during installation for the survey and barcode scanning |
| **Trek** | Bluetooth logger read via phone; StoveTrace/transport lineage |
| **ColdTrace Transport** | Transport monitoring sensor + Android app |
| **ColdTrace App** | Android app used to **configure Wi-Fi** on a CTX |
| **ColdTrace Toolkit** | Separate Android app: download sensor data, device settings, device scanner |
| **StoveTrace** | Sibling product; Facility→**Household**, Equipment→**Stove** |

### Places the docs use two words for one thing

- **Group** (older: "Create a new Group", "Select 'Group' name from the drop down list") vs **Region** (newer: "Region and Facilities", "Select Region"). Same hierarchy object.
- **Equipment** vs **CCE** vs (StoveTrace) **Stove**.
- **Device** vs **RTMD** vs **base station** vs **logger** ("plug it into the logger mounted on the wall").
- **Sensor** means a *wired cable+probe* on CT5 and a *wireless BLE unit* on CTX.
- **Alert** vs **Alarm** used interchangeably ("Alarms: Quickly view the number of hot and cold excursions"; "number of alerts per day"; "Configure alarms").
- **Facility** vs **Household** (StoveTrace) vs **Site**.
- **Working Status** / **Utilization Status** (older forms) vs **Functional Status** (EqMIS).
- **Restore Factory Settings** (CT5) vs **Factory Reset** (CTX) — different scopes.
- **Reset** vs **Restart** vs **Reboot** all used for power-cycling.
- Support address appears as **support@coldtrace.org**, **support@nexleaf.org**, and (typo) `support@coldtarce.org` / `support@gmail.com`.

---

## 4. User roles

Roles are documented in two overlapping systems: **dashboard account types** and **field/programme roles**.

### Dashboard account types

| Role | Can do | Cannot do / notes |
|---|---|---|
| **Admin** (`User Type: Admin`) | Access the top black **Admin** nav: create/edit Users, create/edit Groups (including `Administrators`, `Users`, `Parent Group`, `Gateways`), assign `Admin Group Membership` | — |
| **Staff** (`User Type: Staff`) | Normal dashboard user. When creating a test/ordinary user the guidance is explicit: **"For User Type, be sure to select Staff"** and **"DO NOT enter anything for Admin Group Membership"**; instead "For User Group Membership, select the required groups" ("Create a new user") | Cannot administer groups/users |
| **Invited user** | Self-completes setup: "Once you submit the form, the user will receive an email / SMS link to complete the account setup" ("How to invite a user to setup account") | — |

Scope is controlled by **group membership** + **Default Group**; a user with membership in several groups picks which one loads at login.

### Field and programme roles (from installation and alerting docs)

| Role | What they do | What they receive |
|---|---|---|
| **Health facility worker / nurse (HCW)** | Present at installation ("HCW signature is MUST to complete the job"), clears the fridge, responds to alarms, presses **Stop Alarm**, notes when CT5 could not be connected to a stabilizer | **"Phone number for device alerts (SMS)"** ("Alerts and Reports") |
| **Cold Chain Handler (CCH)** | Clears the ILR of baskets and vaccines during sensor installation | — |
| **Installer / field technician** | Prepares devices (record IMEI, test SIM, charge 6h+), drills and mounts, places sensors, boots in Service Mode, forces upload, fills the online installation form, does first-line troubleshooting and replacements | Dashboard login; uses **Daily summary** — "Useful for day to day viewing for technicians to zoom in on an issue" |
| **Maintenance Technician** | Repairs/replaces devices, sensors, batteries | **"Email address for periodic PDF reports and dashboard login"** |
| **Warehouse manager** | Coordinates schedule with facility manager, receives faulty devices back, holds spares | — |
| **Facility manager** | Grants access/coordination at the site | — |
| **Manager / MoH–EPI staff** | Prioritise and act on unresolved issues; configure escalation. "This alert can be configured by managers to see when issues are not solved by the health facility personnel" | **"Phone numbers for escalated alerts"**; **Monthly summary** — "Useful for managers to help prioritize issues" |
| **RTM Deployment Advisor** | Escalation point for faulty chargers/hardware ("if the charger is not working, then contact your RTM Deployment Advisor") | — |
| **Partner Team / Country Team / Nexleaf Team** | The three parties named under "People involved in Installation" | — |
| **Nexleaf support / HW support** | Remote firmware updates, config files, global-SIM issues, hardware RMA. Several CTX error codes resolve only to **"Contact HW support"** | — |

Explicit prohibitions for field staff:
- CT5 **Function button**: "**DO NOT** press the Function Button… for use by authorized technical repair personnel only."
- CTX **Factory Reset**: "This action is **not recommended for end users** and should only be performed under guidance from the technical support team."
- Installers: "DO NOT touch the vaccines in the ILR", "DO NOT request the staff at the health facility / hospital for any help", "DO NOT request access to the cold room on public holidays or Sundays or outside working hours."
- Group editing: "Be careful what you edit – be sure everything looks correct before you submit."
- Device replacement: "**DO NOT SELECT REMOVE CURRENT DEVICE**" when you mean to replace.

---

## 5. Core flows

### 5.1 Install a CTX + Temperature Sensor + Door Sensor
*Source: "CTX Installation Flow: Configure CTX, TS and Door Sensor to the Coldtrace Dashboard"*

1. "Login to the ColdTrace dashboard via www.coldtrace.org"
2. **"Go to 'Installations' and click 'Install RTMD'"**
3. "Click on '**RTMD IMEI or MAC**' search box / Search the **IMEI / MAC** and Select the IMEI / Click on '**Start**'"
4. "Search the facility name and Select the facility / Click on '**Add or create contact**' / Click on '**Continue**'"
5. "Click on '**Add Sensor**' to associate the Temperature Sensor(TS)" → "Select the Temperature Sensor from the list or Search the Temperature Sensor by entering the Temperature Sensor MAC"
6. "**What are you monitoring** → Choose the sensor type"
7. "Click on '**Configure new CCE in the Facility**'" → "Click on '**Done**' to confirm the completion of the installation"
8. Then "**Door Sensor Installation**" (same association pattern)

### 5.2 Configure a CT5 RTMD (older wizard)
*Source: "Configure a RTMD on the ColdTrace dashboard"; also "How to Install RTMD - Configure RTMD in the Dashboard"*

1. "Go to **Installations** and click on **Install RTMD**"
2. "Enter **Device IMEI** and select from the drop down list / Click on **Configuration date** if you want to modify the date / Click on **START**"
3. "Click on **Select a Facility** … if facility not appear in the list then go to **Manage** → click on **Facility** → click on **Create Facility** → fill the form and click on **Save**. Click on **Add Contacts** to add contacts for this device to receive alarms. Click on **Next**"
4. "Click on **search box** and enter contact number/name and select contact from the drop down list by click on **add**. If contact number not appeared in the list then click on **Create** button to create a new contact. Click on **Next**"
5. "Click on **Add Equipment** to configure sensors" → "Select a sensor you want to associate with the equipment" → "Click on **Ambient** if you want to add it as an ambient sensor / Click on **Select** if an equipment listed. If equipment not listed, Click on **Create Equipment**" → "fill the CCE information / Click on **Save**"
6. "Click on **Edit** if you want to edit the equipment / Click on **Add Equipment** if you want to add other sensors / Click on **Finish**"
7. "Click on **Done** to complete the configuration"

### 5.3 Physical installation day (CT5)
*Sources: "Installation preparation and Coordination", "Base Station Installation", "Sensor Installation"*

**Pre-visit:** installer/warehouse manager shares the schedule with the facility manager; confirm "Number of devices required at the facility", "Power Socket availability in the facility to make sure CT5 can be plugged into a power source", "To check if fridges are working and not condemned or on standby".

**Device prep:** record the IMEI ("check the device IMEI matches the one on the box"), pick a SIM from stock, test the SIM in a phone, "Record the SIM number in the data sheet next to the device IMEI", switch on, insert SIM, "Check the battery percentage and charge the device for 6 hours or more", then switch off and repack for transport.

**On site:** identify the ILR; find the wall location; identify the stabilizer and power socket; ask HCW to clear a space and to empty the ILR if vaccines are present.

**Steps to complete installation at each facility:**
1. "Start the survey in **LogMe** on your phone"
2. "Start up the device in **'Service Mode' by pressing on function button until the device is ON.** Screen will say **service mode.**"
3. "Reset by switching it OFF and ON again after buzzer test"
4. "Finish drilling on the wall and attaching the sensors inside the fridge"
5. "Check the display screen on CT5 make sure it shows a normal reading cycle display… Allow 10 minutes after the installation of the sensor for a sample."
6. "**Fill the online installation form at https://coldtrace.org**, **Login to your dashboard account and go to Manage → Device → Install**" (`https://coldtrace.org/device/config`)

**Ideal base-station location:** "Close to the CCE and to the power source", "Placed on the wall **without being hit by the fridge door**", "**Network connectivity is strong** enough to ensure data upload", "**Easily accessible by a person** to cycle through the temperatures".

**Sensor placement:** match colour-coded cable to same-coloured port; "Sensors to be used in sensor port B & D"; clips in "the center of the back wall in a straight line"; dry the surface first; "Only 1 sensor is to be placed in the CCE at a height of 13 inches from the top of the CCE" and "The sensor has to be **2 cm** away from the back wall of the CCE".

**Post-installation check-list:** force an upload ("Press and hold the stop alarm button (continue holding) / Press and hold the function button for 1 second / Release both buttons"); "Device should start transmitting data in 30 to 60 minutes. In some cases data transmission starts in 24 hours after overnight system reboot"; "Look for a **'device ready'** with the current date and check the communication log for data that recently reached the server (first column) after the IMEI had been added."

**Final check:** normal reading on screen; cycle display for errors and all sensor readings; cables firmly in correct ports; "display should show **'charging'**"; cables not touching the floor behind the CCE.

### 5.4 Turn on the hardware
- **CTX:** "Screw the antenna into the port while the device is off." → "Remove the back panel / insert the micro SIM card into the SIM slot / Push the switch to ON position / Close the back panel by tightening the screw." ("How to turn ON a CTX Base Station")
- **Temperature Sensor:** "Do not open the sensor. Press the black button on the right side of the temperature sensor to turn on the sensor – green LED will flash" ("How to turn ON Temperature Sensor and what LED Lights Indicates"). On boot "The light will blink 5 times, indicating the sensor has booted" ("Temperature Sensor MAC Not Showing on the CTX Display").
- **Door Sensor:** "Remove the screws from the back panel of the door sensor. Attach the power connector to the socket." → "Close the back panel… ensuring the gasket is seated properly to maintain a water tight seal."
- **CT5:** insert SD card ("till there is a click sound"), SIM into SIM 1, "Flip the power switch up to ON – The display screen should light up"; first-ever startup must be in Service Mode.

### 5.5 Configure Wi-Fi on a CTX (ColdTrace App)
*Source: "How to configure Wi-Fi connection to a CTX Base Station"*
Requires an Android smartphone + the **ColdTrace App** from Google Play. "Open **Google Playstore**, Search for '**ColdTrace**'" → "Click '**Install**' and then click '**Open**'" → grant location permission → "Landing page, Click the '**3-lines**' on your top-left" → "Click '**Configure Wi-Fi**'" → "Enable **Wi-Fi** on your **phone** and then reboot CTX device" → "After rebooting the CTX device. Wait for 2 minutes and CTX device will broadcast its **internal Wi-Fi**, click to **connect** to it" → "Click on **Network list** and select your '**Wi-Fi**' to be used, enter **password** and then click '**configure**'" → confirm by cycling to the signal screen and checking **Sw**: "click on the '**arrows**' on the CTX base station until you get to this screen".

### 5.6 View data
*Source: "Coldtrace dashboard and configuration"*
- Landing page tiles: **"Equipment : Total number of equipment deployed / total active equipment"**, **"Performance Summary: Understand the overall performance of your equipment"**, **"Alarms: Quickly view the number of hot and cold excursions you have."**
- Filtering: "Select group from the drop down list / Enter a period that you want to see data and then submit"
- "Click on '**Visualization**' → Click on monthly summary or weekly summary or Daily summary" → "Select '**Group**' name from the drop down list and click on '**Submit**'"
- Daily: "**Find a specific facility:** via the search feature", "**Click any grid square** to: See a plot of the selected day, Export data, Configure alarms", "**View Alert Numbers per Day:** number appears in the grid square are the number of alerts per day"
- Newer path ("How to remove device"): "Go to **Analytics and reports** → Click on **View**" then "Click on **Visualization** / Click on **Daily** / Select **Region** / Click on **Submit**"

### 5.7 Configure a device, thresholds and device contacts
*Source: "Coldtrace dashboard and configuration"*
1. "Go to **'Visualizations'** → Click on **Daily Summary** → Click on *any grid square of a specific device*"
2. "Click on *Configure CT5 Device*, it will redirect you to device details"
3. Device details: "Click on **view logs** to see the recent logs / Click on **setting icon** to view the equipment details / Click on **add equipment/additional sensors** to add sensor / Click on **override** to edit alarm setting additional sensors"
4. Alarm settings: "**Alarm setting are set per sensor and group** / Click on **Override** to edit the thresholds of a sensor / Click on **view group configuration** to view & edit the threshold of a group" → "Enter the temperature range that suits your needs. (in both high and low and delay as you prefer). Click on **Save**."
5. Device contacts: "Click on **Device contacts** to add, remove and view contacts" → "Click on **Add contact** → search contact in the search box and select from the drop down menu. Click on **Save**. To remove a contact click on **Remove**"

### 5.8 Manage facilities, contacts, groups, users
- Create facility (new UI): "Click on **Region and Facilities** → Click on **facilities**" → "Click on **Create facility**" → "Enter facility name and select region for the facility and click on **Save**"
- Create facility (old UI): "click **CCEM** in the blue navigation bar" → "Select **Facility**" → "click the blue **Create Facility** button" → "**Facility Name** and **Group** are required."
- Edit/rename facility: Region and Facilities → facilities → select region + search → **view** → **Edit facility** / **Edit Facility** → rename → **Save**
- Facility contacts: **view** → **Remove** to remove; **"Add contact from coldtrace"** to add → search by name/phone, or **"create a new contact"**
- Primary facility: **view** → **"Set this as my primary facility"**
- Create contact: "Go to **Manage** and click on **Contacts**" → "Click on **Create contact**" → "Fill the contact info and click on **save**"
- Create group: "In the top (black) navigation, select **Admin**" → **Create Group** (top level) or search parent + **"Add child group"** → **"Create New Group"**
- Edit group: **Admin** → search → **Update Group** → **Update Group**
- Create user: **Admin** → **Users** → **Users** → **"Create New User"** → fill → **Create User** → "log out, and test the new account"
- Invite user: "click on **Users**" → "Click on **Invite User**" → "Fill the user form and click on **Invite User**"
- Update CCE make/model: "Go to **'Equipment'** → Click on '**Inventory**'" → select region + enter RTMD IMEI in search → "Click on **View** of a specific sensor" → "Click on **Edit information**" → "Select Equipment type from the drop down list / Click on **Save**"

### 5.9 Remove or replace a device/sensor
Three documented paths:

**A — via Visualization ("How to remove device"):** Analytics and reports → View → Visualization → Daily → Region → Submit → "Click on the temperature grid of a sensor that you wanted to **Replace** or **Remove**" → "Click on **View CCE**" → "Click on **remove**… Or, Click on **Replace**" → "Click on '**replace with sensor for this device**' if you want replace sensor for the same device **or** click on '**replace with sensor for a different device**' … It will redirect you to the installation page to configure sensor."

**B — via Inventory ("How to replace a device/sensor"):** "Go to **Equipment** → Click on **Inventory**" → search the IMEI → "Click on **View** of a specific sensor (ex. A/B/C/…)" → "Click on **Replace Active Device**" → "Select device IMEI from the drop down list / Select sensor / Select start date / Click on **Save**"

**C — via CCEM Equipment (legacy, "Replace a Device" / "Remove a Device Association"):** CCEM → Equipment → search facility or old device IMEI → **View** in the "Actions" column → on the "Equipment Detail" page find **"Association Histories"** → **"Replace Current Device"** (blue) or **"Remove Current Device"** (red) → in the modal pick the NEW Device ID, the **sensor** ("If you are using a Trek device, only sensor A is valid. If you are using a CT5 device, select the appropriate port (Sensor A, B, C, or D)"), and the **date** → **Save**.

Physical sensor replacement on CT5 ("Replace a Sensor on the CT5"): match cable colour to port, unplug the damaged cable, "Plug in the new sensor without unwinding the cable", "Press the function button for new readings to confirm 'new sensor' is working", remove the old cable and clip, re-clip and tape the new one on a dry surface ("Ensure that the clip is little away from the probe"), "Reset the device using a pin", "Confirm all temperature readings by cycling through the display", "Wind up & tie the additional sensor cable behind the CCE".

### 5.10 Force upload / reset / factory reset

| Action | Device | Steps |
|---|---|---|
| **Force upload** | CT5 | "Press and keep holding **stop alarm button** / Then briefly press **function** button, letting go of them together. / The device should indicate that it is '**Transmitting…**' / It will eventually show '**Transmission Completed.**'" |
| **Force upload** | CTX | "Press and hold the 'stop alarm' button for few seconds (5 seconds) till there is a beep sound / Then after few minutes (2/3 minutes) → click 'arrow' button and you will land on a screen saying '**Force upload in progress**'" |
| **Reset** | CT5 | "Use a pin to push the RESET button through the small hole on the side of the CT5 for 2-3 seconds **OR** Open the CT5 and access the power switch, to switch it OFF and ON" |
| **Reset** | CTX | "By using a 'pin' and insert it in the 'hole'… The screen backlight will blink once after inserting the pin. This indicates the action was successful." OR "opening the back cover, and push the switch to 'OFF' and then push to 'ON'" |
| **Restore Factory Settings** | CT5 | Ensure SD+SIM inserted → hold Function while switching ON → hold until "**Service Mode**" → release → "CT5 will show '**Buzzer test**'. Press the Stop Alarm button." → RESET when normal screen restored. "Restoring Factory Settings clears all configuration from the CT5. E.g. alarm settings, phone number etc. Go on the dashboard and send configuration settings again." |
| **Factory Reset** | CTX | Method 1: hold "Stop Alarm" and insert a pin in the reset hole until "**Factory reset in progress**". Method 2: power off, hold "Stop Alarm", power on, keep holding until "**Factory reset in progress**". Caution: "will erase all recorded data from the CTX device. Wi-Fi settings configured via the app will also be cleared." |

### 5.11 Raise a support ticket
*Source: "Service Desk - Nexleaf Analytics", "Customer Support With WhatsApp"*
Three channels:
1. **Email** the support address.
2. **Service desk:** "Log in to the coldtrace.org / Click to **Resources** / Click on **'Service Desk'**" → "Select issue type - **Software Issues / Hardware Issues / Deployment Issues**" → "Select device type - **CT5 & CTX / Coldtrace Transport / Other**" → fill **Summary** ("i.e. 'SD card error', 'Connectivity issue'"), **Issue type**, **Description**, **Urgency** ("i.e. Critical/high/medium/low") → **Send**. In the portal you can also click **"Need to raise a request"**.
3. **Chat with Support (WhatsApp):** desktop — "Go to **Resources** → Click on **Chat with support**"; mobile — a WhatsApp widget appears on the dashboard; or message the Nexleaf WhatsApp Business number directly. "The initiated chat will automatically raise a ticket."

### 5.12 ColdTrace Toolkit app (field data offload)
*Source: "Coldtrace Toolkit app"*
Install "**ColdTrace Toolkit**" from Play Store; grant Notification + Bluetooth permissions. Bottom menu: **"Download data, Device Setting, More"**.
- **Download data:** "Click on **Download data** → Select Temperature sensor from the **select sensor drop down list** → Click on **Set start date** (optional) → Click on **Get summary**". "Once data download Completed, it will display the **Data Summary** and also give option to 'Share' or 'Download' data".
- **Device Setting:** "customize the configuration of the Temperature sensors. it also gives an option to enable or disable '**Shutdown on the button press & hold**'".
- **More → Device Scanner:** lists nearby active sensors with `Address(MAC address)`, `Type`, `Data Received at`, `Temperature`, `Signal Strength`, `Battery`, `Version(firmware version of the sensor)`.

---

## 6. States and statuses (verbatim)

### Alarm / alert thresholds and conditions
*"Alerts and Reports"*
- Basis: "country's requirement **OR** WHO recommended **-0.5°C for cold excursion and 8°C for hot excursion**"
- Device alert durations: "If it is below **-0.5°C for 1 hour** / If fridge is above **8°C for 10 hours**"
- Escalated alert criteria: "**More than 8 °C for 20 hours**" / "**Less than -0.5 °C for 5 hours**"
- Alarm threshold config fields: "high and low and **delay**"
- Baseline rule: "device alerts are **not** to be turned on the first month of the deployment"
- Audio alarm: "configured to buzz immediately after a temperature breach"; "If the reason for the alarm is not resolved, the alarm will buzz **every 6 hours**"
- Escalated alerts (per "SMS and Escalation Alerts"): "sent out **once or twice a day** from the dashboard for a whole group… intended to be sent for issues lasting a **minimum of 24 hours**"

### CT5 display states / messages
`Service Mode` · `Buzzer test` · `device ready` · `charging` · `Power Out` · `Transmitting…` · `Transmission Completed.` · `reg denied` · `hibernating` / `Hibernating` · `SD card error` / `SD card failure` / `SD Card Failure/Error` · `Time error` / `Time Error` · `operation not allowed` · `S---` (no signal / SIM not read) · `G20%` (signal strength display format)

### CTX display / error codes
*"CTX Error Code" — exact strings*
`On board Sensor fail` · `External Flash Fail` · `Not able to read bat` · `UART is Not working` · `Incorrect data` · `Pdp Activation Fail` (also written `pdp activation fail`) · `SIM not inserted` · `Wrong SSID/PWD` · `CELL : Poor Network` · `WiFi : Poor Signal` · `Can't Connect router` · `SIM reg. failed` · `HTTPS timeout` · `DNS error` · `OTA Update In Progress` · `Server Error 500` · `Server Error 404`
Plus operational screens: `Force upload in progress` · `Factory reset in progress`

### CTX screen field labels
"**b** - Base Station IMEI, Current Time, Signal, **T** - Ambient Temperature, **h**-Humidity, **P**-Power, **B** - Battery"; "**Sw** - WiFi Signal , **Sc** - Cellular Signal"; "**Fb:** base station firmware version"; "**Fw:** sensor firmware version"

### CTX base station LED colours
- **Magenta** — "The base station light will be magenta in color when a sensor is disconnected or out of range."
- **Blue** — "When there is poor WiFi or SIM/cellular signal, the light on the device base station will be blue in color."

### Temperature Sensor LED states
"**Solid green LED light:** Sensor is on and temperature is OK / **Solid red LED light:** Battery is low / **Flashing red LED light:** Temperature alarm – configured from dashboard / **Flashing green LED light:** Sensor is turning on"

### ColdTrace Transport sensor LED
"A steady green LED light will be displayed followed by blinking 10 times signalling that the device is on."

### Equipment / device status fields
- Older forms: **`Utilization Status`** and **`Working Status`** (both required on Create Equipment; both editable on Device Info). Enumerated values are **not** listed in the docs.
- EqMIS inventory: **`Functional Status`** with values **"Functional, Faulty, Unknown"**
- EqMIS **`Equipment Type`** values: **"Refrigerator, Freezer, WIC and WIF"**
- Facility inspection language for CCE availability: fridges "working and not **condemned** or on **standby**"

### Signal-strength thresholds
- CTX: "Check if the signal strength is above **20%**. If not, move the base station to a location with a better signal ie., **> 30%**." Poor signal defined as "signal strength less than 20%".
- CT5: "Network percentage is very low – figure in front of G is **less than 30%**"; "If the SIM shows '**G20%**' or lower, the connectivity may not be good enough to send an SMS"; "signal strength is good (above **30%**)".

### Support ticket states
Issue type: `Software Issues` / `Hardware Issues` / `Deployment Issues`. Device type: `CT5 & CTX` / `Coldtrace Transport` / `Other`. Urgency: `Critical/high/medium/low`.

### Battery / timing constants
- CTX battery "lasts 7 days when disconnected from power"; "The device will fully charge in 3-4 hours if completely drained"; charge 1 hour before retesting.
- TS batteries "non-rechargeable but last up to 7 years".
- CT5 new battery: "New battery will require **15 minutes** of power before the CT5 light comes on"; pre-install charge "6 hours or more"; after power restored "CT5 will require **10 minutes** to recharge before it starts working again".
- CT5 startup: "**Connection can take between 6 - 15 minutes** to establish"; "Messages can remain on the screen anywhere from **5-20 minutes** depending on number of SMS"; data transmission begins in "30 to 60 minutes… In some cases… 24 hours after overnight system reboot".
- TS→CTX Bluetooth: "typically up to 10 meters"; "Recommended range of Temperature Sensor from Base Station is 10 meters"; base-station-to-CCE "not more than 20metres".
- Trek→phone: "within 2 to 5 meters with line of sight"; ColdTrace Transport: "within the 100-meter range".

---

## 7. Real-world failure modes

### Connectivity / data not arriving

**CT5 — "Data not getting uploaded"**
*Indicators:* "Display shows '**S---**' or no signal – this means that the device may not be reading the SIM card"; "Date and time on the display screen is invalid"; "Error message on screen – '**operation not allowed**'"; "Network percentage is very low – figure in front of G is less than 30%".
*Resolution:* (a) **Test the SIM** — switch off, remove SIM, "Insert the sim card in a mobile phone and try browsing a site you do not normally visit to make sure the data works", reinsert. (b) **Start the device in service mode** — "Hold down the function button and use a pin to push the RESET button for 3 to 4 seconds", hold until "service mode", release, press stop alarm at "Buzzer test". "If the screen starts showing correct date & time and network percentage, the issue stands resolved. If the issue continues then take the device outside to a better network zone and repeat the service mode steps." (c) If display normal and signal >30%, "there could be a **back log of files** that need to be transmitted" → **force upload**. Critical caveat: "**Data transmitting will only work if the device is sampling.** Make sure a probe has been plugged in, and temperature for the sensor is displayed on the screen."

**CTX — "CTX data not getting uploaded - Data not received on the Coldtrace.org dashboard"**
*Indicator:* "Data is not displaying on the Coldtrace dashboard."
*Possible issues:* "Poor Network"; "No data bundle in SIM"; "**Incorrect MAC Address of the temperature sensor.** (NB: This case CTX base station is transmitting data but NO temperature sensor data)"; "Recommended distance of base station from CCE not more than 20metres".
*Resolutions:* move for signal >30%; test a local SIM in a phone with "**Configure the phone to 2G only**" and open coldtrace.org; for a global SIM escalate to support; "Ensure the MAC address of the temperature sensor on the dashboard is the same as the one in the CCE"; force upload.

**CTX — "Poor Wifi or Sim Signal - CTX"**
*Indicator:* base station light **blue**. *Possible issues:* signal <20%; "SIM not registering on network. CTX display shows 'pdp activation fail'".
*Resolution:* global SIM → report to support; local SIM → check insertion, test in a phone set to 2G only, reinsert into "slot 1 of the CTX device", else "replace it with a new one or change the network service provider commensurate with the location".

**CT5 — "'reg denied'"** (Data services on SIM not available)
Reset via pin or power switch. Then verify: check date & time on display; if normal, remove SIM, test in a phone's primary slot against the Nexleaf dashboard site; "Check that the SIM card is not dusty/dirty and clean if need be"; if the site doesn't open, replace the SIM. After a new SIM: **Restore Factory Settings**, then "**Push configuration settings on CT5 from Nexleaf dashboard**".

**Global SIM / APN failures — "Setting the APN for a global SIM on CT5"**
"Most global sims, IoT sims, M2M sims, machine sims require a non standard APN." The CT5 looks up the APN by MCC/MNC in `apn.ini` on the SD card. Option 1: rename `apn.ini` → `oldapn.ini` (forces fallback) and edit the `SIM1`/`SIM2` APN in `thermal.ini`, then factory reset. Option 2: edit the country/network section of `apn.ini` directly, then factory reset. **"NOTE: If you do any of the below, you will stop local sims from being able to work."**

### Sensor / pairing failures

**"Temperature Sensor Disconnected from CTX or Out of Range"**
*Indicator:* magenta base station light. *Cause:* "Failure of the sensor to pair with the device due to extended distance beyond the acceptable range or the presence of **barriers to Bluetooth transmission like concrete walls**."
*Resolution:* "Check the last reported time and signal strength on the corresponding base station screen"; "Move the base station to a location more central to all the sensors"; "Restart the device and start pairing the sensor to the device."

**"Temperature Sensor MAC Not Showing on the CTX Display"**
*Indicator:* "If the last 6 digits of the Temperature sensor do not show up on the base station display". *Cause:* sensor switch not turned on, or out of range. *Resolution:* press the button (light blinks 5 times = booted); confirm ≤10 m from base station.

**"Temperature sensor fails to connect with the CTX base station despite stable network conditions"**
1. "Verify Power Status of Temperature Sensor(TS)… Check the battery level or power indicator LED"
2. "Check Device Proximity… within Bluetooth range (typically up to 10 meters)… Remove any physical obstructions or interference sources"
3. "Validate Device Registration… Confirm that the **IMEI numbers** of both the **TS** and **CTX** are correctly entered and assigned. IMEI mismatches can prevent successful pairing or data transmission." *(See Open Questions — TS is identified by MAC elsewhere.)*

**"The LED light on the temperature sensor does not turn on when the button is pressed."**
Causes: "faulty LED, battery malfunction". No field fix — "Possible battery or hardware issue. Please contact support."

### CT5 temperature-reading failures

**"CT5 Temperature reading is abnormal on one or all sensors"** (e.g. "56°C or -56°C")
*Analyses:* (1) "Sensor cable is improperly connected to the CT5" — verify cables are seated and "the sensor probe is secured on the wall of the CCE by the clips and **NOT getting pressed by the baskets**". Swap test: unplug a known-good sensor and the suspect, plug the good one into the suspect's port, "**The function button will force the CT5 to update the temperature readings.** Press the function button and wait 1 minute. Cycle through the display… (If the device shows transmitting wait until you see the time to press the function button.)" (2) "Sensor cable or sensor probe is damaged" — "Inspect the sensor cable and sensor probe to make sure there are no cuts or damage of any kind. If found damaged or broken, **raise a ticket**."
*Corrective action:* "If it shows correct temperature, sensor needs to be replaced. If it continues to show incorrect temperature reading then CT5 needs to be replaced. **All sensors do not need replacing if a single sensor is showing abnormal temperature**… If all the sensors are showing abnormal temperature then order a spare and then perform the steps above."

**"CT5 One or more temperature reading not displayed"** — same swap test; "If it shows correct temperature, sensor needs to be replaced. If it continues to show incorrect temperature reading, then CT5 needs to be **repaired**."

**"CT5 Temperature reading is negative"** and **"CT5 Temperature data is not showing up on the screen or online"** — identical remedy: "Plug a known working probe into the faulty port, then restart device. / Plug the faulty sensor into a known working device and press function button. After 1 minute, press change display button… / **Contact Nexleaf personnel if sensor or device is faulty.**"

**Sensor damage prevention ("Sensor Installation")** — "Sensors will get damaged if: Stacking ILR with vaccines without boxes / Moving baskets inside the ILR over the sensor cables / Reaching for the lower level of the ILR without moving top baskets out / Probes getting caught when pulling the baskets out from the ILR / Moving the baskets from side to side over the cables."

### Power / display failures

**"CT5 Screen is blank or flickers when the device is on"** — restart; check display for messages; if blank, switch off, remove and re-insert the SD card, switch on.

**"Troubleshooting" (Advanced) — three distinct blank-screen cases:**
- **1a: back light off** → "CT5 is not getting power". Verify adapter seated, adapter in stabilizer, "Check if voltage stabilizer is working", test the socket with another device, substitute an Android phone charger, "Dust off / clean CT5 if dusty and/or dirty". "**An android phone charger can be used in place of the device charger to check if the charger is faulty or not.** If the charger is not working, then contact your RTM Deployment Advisor." "The screen after showing sensor D's temperature will show either the words 'charging' or '**Power Out**'." "*If the problem was with the power source and it has been rectified, CT5 will require 10 minutes to recharge before it starts working again.*"
- **1b: back light on** → "LCD Issue/LCD display is not working" → reset with a push pin, then verify power supply.
- **1c: LCD blank but data uploading** → "CT5 software or hardware issue" → reset; "If the display returns to normal then this was a software issue. If issue persists after RESET, contact Nexleaf support desk."

**"CT5 Screen shows 'Hibernating'"** — device is running out of power. "Ensure the device is connected to power and power adopter is working." If solar: "Ensure there is a few hours of power a day so the device stays charged for the whole day"; "The solar panel is facing the direction of the equator"; substitute an Android charger to test.

**"CT5 device does not seem to charge when it is connected to power"** — "Check if the power charger is functional by substituting android phone charger for power cable and see if power returns."

**"CTX Display Blank- No light on the screen"** — check charger firmly connected to CTX and outlet; test the outlet with another device; check the switch is ON; "Plug the CTX in for 1 hour to charge."

**"CTX Battery Charging Percentage Not Increasing on Display"** — (1) test with a known-good charger and cable, monitor the percentage; (2) force upload and "leave the device for an hour to upload any pending data"; (3) factory reset — "This will reset the internal battery reporting mechanism… A factory reset will erase all the data stored on the device."

**"CTX LCD Screen Light fluctuating"** — hardware. Two causes: "**Moisture Ingress:** Water or moisture may have entered the device. **Please note, this device is not waterproof.**" and "**Physical Damage**: The screen may have suffered from a drop or impact."

**"CTX device buttons are not functioning as expected"** — force upload and "Wait for at least 1 hour"; then factory reset; "If the buttons continue to be unresponsive this could be a possible hardware problem."

### Storage / firmware failures

**"CT5 SD Card Error"** — "Switch off the device / Remove SD card / Re-insert SD card till there is a click sound / Switch on the device."

**"SD card Troubleshooting"** (deeper fix for `SD card error` and data-not-uploading) — turn off CT5, remove SD card, "Delete all the files on the SD card (including the folders/directories) or format the SD card", "Obtain **zip file from Nexleaf**", copy all files ("named as apn.ini, thermal.ini, etc"), reinsert, power on.

**"CT5 Display shows 'Time Error'"** — "This issue is related to the device **firmware**". Two paths: "we will update the device firmware **remotely if the device is sending data**"; "if the device is not sending data, then we will share the configuration files and the next step is to **format the SD card files and load new files**." Note: this failure also surfaces as an alert — "if user received sms/email alert on 'Time error'".

**`OTA Update In Progress`** — "Wait for it to finish, **do NOT power off device.** It may happen twice in a row."

### Alerting failures

**"Issue 5: No Alerts"** ("Troubleshooting") —
1. "Ensure phone number(s) registered on Nexleaf dashboard are correct. If phone numbers are added, click on '**send config by GPRS**' (This saves changes)"
2. "Ensure the device is on and sampling temperature data pressing the center display button to cycle through all sensor readings"
3. "Check the signal strength of the SIM… If the SIM shows 'G20%' or lower, the connectivity may not be good enough to send an SMS"
4. "**Check the SIM is active:** The SIM card can show connectivity, i.e. there can be a number % in front of G but the data and SMS service may be deactivated if bill has not been paid." Test by putting the SIM in a phone and sending an SMS.

**"SMS and Escalation Alerts"** — the SMS content problem: device-originated SMS "**do not include information about the facility or the CCE** (cold chain equipment) they are monitoring. This is because that information is stored on the dashboard and not on the device." Workaround: save the device's sending number in the phone under the facility name; "The SMS will contain the sensor ID (a,b,c,d,e), enabling you to know which CCE had the issue when you look at the dashboard or visit the site."

### Trek / ColdTrace Transport failures

**"Trek Device is not detected by nearby phone"** — "Ensure Trek is within 2 to 5 meters with line of sight to the phone / If still not seeing device: **use magnet** to try and turn on Trek / If still not seeing: reboot phone."

**"ColdTrace Transport device is not detected by nearby phone"** — causes: sensor or phone off; phone Bluetooth off; out of range; "The battery in the sensor is not functional." Resolution: press ON/OFF (steady green then 10 blinks), turn on phone Bluetooth, close the range. Else "it is likely that the battery of the sensor is not functional. **Note the MAC address of your sensor and report this issue.**"

**"LED status indicator does not blink."** — "The primary reason the LED would not light up is if the battery is dead. This can be confirmed by switching the sensor on… and checking on the application if the sensor is active."

**"Low or no signal strength"** — "Ensure the sensor and mobile phone are within the 100-meter range with no obstacles (metal, concrete wall, etc.) or electromagnetic environment that may interfere with bluetooth connectivity."

**"ColdTrace Transport App crashes"** — "An older version of the application is running." Update from Play Store; restart the phone; else report.

**"Dashboard has no data but is downloadable from trek"** — "First, check that phone is able to access internet." Inspect: "Is there physical damage due to heat? Is anything showing up in the app? Is anything showing up on the dashboard?" Tests: "If nothing is in the app, try a magnet on the side of the Trek. hold it on the short side with the symbol and the lanyard hole for about 10 seconds." "If no data is showing up on the dashboard, try **reconfiguring the device from the app**. Wait 20-30 mins, download data, and check the dashboard again."

**"Trek outputting strange/irregular data"** — "0 degree data / Over 300 degree data / More than 10 cooking events in one day" → "the sensor cable might be bad or unplugged". Check the probe is plugged in and "the probe end does not look burnt out"; swap in a known-good cable, wait 2–3 minutes, "If the device is not sending ambient temperature, and you know for sure the cable works, replace the trek. Otherwise, replace the cable."

**Data-quality heuristics ("StoveTrace Data API")** — "If the temperature is 0 consistently… the sensor is unplugged or broken / If the temperature is negative, this means the sensor is likely broken / If the temperature goes about 300C… likely broken / If the temperature stays at a single value for more than 12 samples / The data has large variations or oscillates rapidly".

### Deployment / installation failures

**"Pre-Installation Coordination: Challenges"** — challenges "HCW not available / SIM Cards not working / Device Failed physical inspection / **LogMe did not scan the barcode**"; solutions "Call Partner / Contact Partner if SIM card not active / Notify warehouse manager about faulty device / Use another device. **Barcode scan is important**".

**"Site Installation: Challenges"** — "Wall behind ILR not fit for installing CT5 (esp for tiles and stone)" → "Identify a suitable place, even at a distance, use an extension cord"; "No electricity at the time of installation" → "Request for generator to be switched on"; "HCW not available" → refer to HCW/facility manager.

**"Unsuccessful Installation"** — two reasons: "1. The device is giving an error (abnormal temp, broken parts, no data coming in from the device)" → "Pack up the faulty device in its box and **write the reason of damage/error on the box** / Send back to the warehouse / Use an extra or another device to complete the installation"; "2. The infrastructure to install the device is not present at the facility (there is no fridge in the facility, there is no power socket for the CT5)".

**Escalation-to-hardware failures** — five CTX error codes resolve only to "**Contact HW support**": `On board Sensor fail`, `External Flash Fail`, `Not able to read bat`, `UART is Not working` ("Modem is not working"). Cloud-side codes (`Incorrect data`, `Server Error 500`, `Server Error 404`) route to the support email.

---

## 8. Integrations

**DHIS2 (Malawi)** — Documented only as a product brief entry: "**Malawi DHIS2 - Coldtrace Integration.** This project focuses on developing an integration between Nexleaf ColdTrace and Malawi's DHIS2 cold chain management module. This integration aims to **seamlessly transfer temperature data from ColdTrace to DHIS2**, providing DHIS2 users with insights into cold chain equipment performance." ("Product Brief Repository", Product space). The detailed brief lives in an external Google Doc, not in Confluence. Nothing in the Service Desk space mentions DHIS2 at all.

**EqMIS / EQMIS (Equipment Inventory)** — "The Equipment Inventory Page is a centralised and intuitive inventory tool designed to streamline the management of cold chain equipment and act as a foundation for management of all equipment in a facility **in line with the connected clinic strategy**." Hypothesis: "unified equipment management as it allows users to easily locate and manage all medical equipment — starting with CCEs, from when they are delivered to the country **until they are decommissioned**, whether they are monitored by CT5, other temperature devices or **unmonitored**." Features: expanded equipment data, hide/show columns, robust search + filters (install date, Make and Model, CCE Type, Facility Name, Functional Status), per-equipment profile pages with RTM association history, CSV download with single/multi-row selection. Navigation: "Login > Select **Equipment Inventory** on Side Navigation". Available on web and on the ColdTrace Android app. ("EqMIS - Inventory Management Page")

**Third-party temperature monitoring devices** — EqMIS explicitly supports CCEs monitored by other RTMDs "currently supported via integration and beyond: **Haier UCool**, **Berlinger FT2**, **Beyond Wireless Thermometer**" ("EqMIS - Inventory Management Page").

**SMS** — Device-originated SMS temperature alerts sent directly from the RTMD's SIM: "These are sent by the device if the SIM allows it (direct sms)." Content is minimal (sensor ID only, no facility/CCE). Alerts fire once per condition met. Escalated alerts are generated by the dashboard, not the device. Dashboard config is pushed to the device over the cellular data channel — "click on '**send config by GPRS**'" / "send configuration settings again".

**Email** — Device alerts also go by email; escalated alerts by email carry facility and group info ("Subscribing to one or more group's escalated alerts will give users facility and group info, though they'll be received by email"); periodic weekly/monthly **PDF reports** go to managers' and technicians' email addresses.

**WhatsApp** — A support channel, not a data channel. Nexleaf runs a WhatsApp Business number; "The initiated chat will automatically raise a ticket." Reachable via a widget on the mobile dashboard, via "Resources → Chat with support" on desktop, or directly in WhatsApp. ("Customer Support With WhatsApp")

**Jira Service Desk** — The support portal, reachable from "Resources → Service Desk" inside the dashboard, with structured issue-type/device-type/urgency fields. Knowledge-base articles are surfaced to customers under topics "Coldtrace Dashboard", "Device and Troubleshooting", "Coldtrace Transport".

**Android apps** — three distinct ones:
- **ColdTrace** (`org.nexleaf.coldtrace`) — Wi-Fi configuration for CTX; also hosts the mobile Equipment Inventory.
- **ColdTrace Toolkit** — offline sensor data download, device settings, device scanner.
- **ColdTrace Transport** — transport sensor scanning/reading.
- **LogMe** — installation survey and barcode scanning (third-party/companion; used during install).

**Data APIs** — Documented for StoveTrace only ("StoveTrace Data API"; a second page "StoveTrace: Daily cook time and cooking event API access"): JWT bearer auth with tokens issued by Nexleaf Support, "maximum of 3 months" expiry, scoped to specific groups. Group API `https://stovetrace.org/api/v2/equipment/` with `group`, `start`, `end`; data API `https://stovetrace.org/api/v1/equipment/[Equipment ID]/[Start date]/[End Date]/` returning CSV with columns `date`, `temp`, `batt`, `battplugged`. "The queries on the data are run using the timezone of the group." Caveat on eventual consistency: "if you do the exact same API call over the course of a week, you may eventually get different results" because delayed data updates results. **No equivalent ColdTrace API page exists in this space.**

**Demo environment** — `demo.coldtrace.org` with a shared demo login, a group "California" with "administrative levels (Province/District)" and city-named facilities. "**NOTE**: you will see gaps in the data because this is demo data."

**Dev environment** — `https://dev-honles.coldtrace.org/equipment` referenced as the EqMIS inventory URL.

---

## 9. Open questions for Raphael

1. **Group vs Region — is this a rename or two concepts?** Older pages use `Group` (hierarchical, with `Parent Group`, `Administrators`, `Users`, `Default Gateway`) and newer pages use `Region` ("Region and Facilities", "Select Region"). Is Region just the current label for Group, or is Region a level *inside* a Group tree? This determines whether the hierarchy is n-deep or fixed (Country → Province → District).

2. **Which navigation generation is current?** The docs describe at least three UIs: (a) a black `Admin` bar + blue `CCEM` bar with Facility/Equipment/Device/Facilities; (b) a left nav with `Installations`, `Region and Facilities`, `Equipment → Inventory`, `Analytics and reports`, `Users`, `Resources`; (c) `Manage → Contacts / Equipment / Facility` plus `Report/Escalation` and `Visualization`. Which is live today, and are the CCEM screens still reachable?

3. **Status enumerations are undocumented.** `Working Status` and `Utilization Status` are required fields on Create Equipment and editable on Device Info, but no page lists their values. EqMIS introduces `Functional Status` = "Functional, Faulty, Unknown". Have Working/Utilization Status been collapsed into Functional Status, or do all three still exist? And is there a separate device-side status (deployed / active / decommissioned) behind the landing tile "total number of equipment deployed / total active equipment"?

4. **Escalated alerts: SMS or email, and what duration?** "Alerts and Reports" says the dashboard "will send a summary message each day at a pre-set time **to the manager**" and lists "More than 8 °C for 20 hours / Less than -0.5 °C for 5 hours"; "SMS and Escalation Alerts" says they are "sent out once or twice a day… intended to be sent for issues lasting a **minimum of 24 hours**" and "**they'll be received by email**". Which is authoritative? Also both pages carry unresolved editorial notes: "**NOTE: Please agree on this WHO threshold at the meeting**" and "**NOTE: Please agree and confirm on this duration for escalated alerts.**" — were these ever settled?

5. **TS identifier: MAC or IMEI?** "How to find the MAC address of a Temperature Sensor" and the install flow both identify a TS by 12-digit MAC. But "Temperature sensor fails to connect with the CTX base station…" says "Confirm that the **IMEI numbers** of both the **TS** and **CTX** are correctly entered… IMEI mismatches can prevent successful pairing." Do sensors have IMEIs, or is that article wrong?

6. **Range limits conflict.** Base station to CCE is "not more than 20metres" but TS-to-base-station range is "10 meters" in two places. Which constrains installation planning? Similarly Trek is "2 to 5 meters with line of sight" in one article and ColdTrace Transport is "100-meter range" in another.

7. **Are Trek and ColdTrace Transport the same product line?** They share the pattern (BLE logger + Android app + MAC address) but have different range figures, different wake mechanisms (magnet vs ON/OFF button), and different support device-type options. Is Trek deprecated, is Transport its successor, and is Trek still used for ColdTrace (vs StoveTrace only)?

8. **Sensor IDs go to `e`.** CT5 has four ports (A–D) but SMS alerts "will contain the sensor ID (a,b,c,d,e)". Is `e` the onboard/ambient sensor? For CTX, how are multiple wireless sensors labelled on the dashboard — still A/B/C/D slots, or by MAC?

9. **Is there a ColdTrace data API?** Only StoveTrace API docs exist. Do ColdTrace partners (and the DHIS2 integration) use the same `/api/v1` and `/api/v2` endpoints on coldtrace.org, and are `batt` / `battplugged` meaningful for CT5/CTX (the StoveTrace doc says "ignore this column")?

10. **DHIS2 integration direction and status.** The brief describes a one-way push of temperature data ColdTrace → DHIS2 for Malawi. Is it shipped? Is there any inbound sync (facility/org-unit hierarchy from DHIS2 into ColdTrace regions)? Facility identifiers (`Facility Identifier`, `Facility ID`) look like the natural join key — is that how it works?

11. **CTX Error Code table has duplicate/inconsistent entries.** `On board Sensor fail` appears twice (rows 1 and 3, with slightly different descriptions: "Device not able to read data" vs "Sensor node not able to read data") and `External Flash Fail` appears twice (rows 2 and 5). Are these actually distinct codes with different on-screen strings, or a copy/paste error? Also several codes say "**Test SIM in phone to ensure connection to EVIN works**" — EVIN is India's eVIN system; is that a leftover from an India deployment, and should it read coldtrace.org?

12. **Facility contacts vs device contacts vs report subscriptions — three lists or one?** Contacts attach to a facility, to a device, and separately as escalated-alert / weekly-report subscribers. Is a single Contact record reused across all three, and does adding a facility contact automatically wire up device alerts?

13. **"Add or create contact" is described as required in the install flow but contacts govern who gets alerts.** Combined with the rule that "device alerts are **not** to be turned on the first month of the deployment" — is there an explicit alerts-enabled toggle per device/facility, and where does it live in the UI? Nothing in the docs shows it.

14. **`Gateway` / `Default Gateway` on Group** is never explained. Is this SMS gateway routing (per-country aggregator), and is it still in use?

15. **Which support address is canonical?** Articles variously give support@coldtrace.org, support@nexleaf.org, plus obvious typos (`support@coldtarce.org`, and `support@gmail.com` on "CTX LCD Screen Light fluctuating" — that page needs fixing regardless).

16. **CT5 Installation Training (page id 2244378627) is empty**, and "Data Hierarchy" (100630530) is a single image with no text — so the canonical hierarchy diagram is not machine-readable. Is there a written version of the data hierarchy anywhere?

17. **`Funding Source`, `Shared (Power Source)`, `ColdTrace Power Source` vs `Power Source (Equipment)`** appear on the Create Equipment form with no explanation and no value lists. Are these still collected, and what distinguishes the equipment's power source from "ColdTrace Power Source"?

---

# Part II — Live platform audit (coldtrace.org, 2026-08-06)

Read-only + non-destructive interaction on production. 10 records opened via table `View`.
Complements Part I (Confluence docs) with how the product **actually behaves**.

## 10. Real IA — Equipment Management

Six top-level modules, switched by a grid icon in the top-right utility bar. **Switching modules
swaps the entire left sidebar**: `Equipment Management` · `Analytics & Reports` · `Training` ·
`ColdTrace Transport` · `Events` · `Health Tech Hub`.

| Nav label | Route | H1 |
|---|---|---|
| Home | `/home` | — |
| Health Status | `/landing/equipment` | *(no H1 — accordions only)* |
| Inventory ▸ Cold Chain Equipment | `/equipment` | Equipment Inventory |
| Inventory ▸ RTMDs | `/device` | Devices |
| Inventory ▸ Passive Equipment | `/equipment/passive` | Passive Equipment |
| Inventory ▸ Solar Equipment | `/equipment/solar` | Solar Equipment |
| Inventory ▸ Activity Log | `/journal` | Activity Log |
| Spare Parts | `/spares` | Spare Parts |
| Performance | `/viz/equipment/inventory` | Equipment Performance |
| Electrification | `/viz/electrification` | Electrification |

Detail routes: `/equipment/:id` (Equipment Details) · `/equipment/:id/maintenance` (geolocation-gated) ·
`/device/:id` (RTMD Details) · `/device/logs/:id` (Device Logs) · `/journal/:id` (Installation Detail) ·
`/journal/:id/maintenance` (Preventative Maintenance Summary) · `/tech-hub/create-request?equipment=<id>`.

Breadcrumb pattern: `⌂ Home › [group] › [current page chip]` — current page is a filled grey chip.

## 11. Conditional UI — the rules that matter for design

1. **Monitored vs unmonitored is the real conditional axis on a CCE record — not functional status.**
   - Unmonitored → header has 2 buttons (`Create Service Request`, `Actions`); right rail collapses to
     the sentence `This device is unmonitored`.
   - Monitored → header has 4 (`Create Service Request`, `View Equipment Plot`, `View Daily Summary`,
     `Actions`); right rail shows RTMD link + `Sensor ID` + `Association Date` + `Replace` / `Remove`.
2. **CCE `Functional` / `Faulty` / `Unknown` change the status chip and nothing else.** Same fields, same
   population, same `Actions` menu, editing unrestricted at every status. A `Faulty` CCE carries **no
   fault reason, no fault date, no reporter, no last-good-reading**. Design gap, not a display gap.
3. **RTMD status is derived from upload recency** and is rendered **only in the list, never on the detail
   page**. Today = `Functional`; months stale = `Faulty`; years stale = `Unknown`. The only status
   evidence on a device is inside `View Logs`. `Error Code` / `Error Message` columns exist and are
   never populated.
4. **RTMD settings are region-inherited**, so they are byte-identical across statuses. Nothing in
   Settings distinguishes a dead device from a healthy one.
5. **Row `⋮` ≠ detail `Actions`.** CCE row: `Edit` · `Decommission` · `Delete` · `Create Service Request`.
   CCE detail `Actions`: `Edit Information` (blue) · `Decommission Equipment` (amber) ·
   `Delete Equipment` (red) — drops the service request, relabels the rest. RTMD row: `Edit` · `Dissociate`.
6. **`Ambient` is modelled as a CCE**, forcing equipment-shaped fields onto a bare sensor:
   `Serial Number --`, `Install Date --`, `Power Source Unknown`, and a meaningless
   `Maintenance Schedule: Every quarter`. Only record where `Maintenance Status` is bare `--`, no chip.

## 12. Status vocabularies (verbatim) — five entities, five incompatible sets

| Entity | Values | Where |
|---|---|---|
| CCE functional | `Functional` · `Faulty` · `Unknown` · `Decommissioned` | KPIs, `Status` chip, detail chip, `Functional Status` filter |
| CCE deployment | `Deployed` · `Installed` · `Not in use`; detail says `In Use`; form radios `In use` / `Not in use` | tabs, field, filter, form |
| CCE maintenance | `Unknown` · `OK` · `Upcoming` · `Due` · `Overdue` | `Maintenance` chip + filter (label is **`Overdue`**, not "Past Due") |
| RTMD | `Functional` · `Faulty` · `Unknown`; `Monitored` / `Unmonitored` | device KPIs + chip, `Monitoring Status` in Activity Log |
| Passive | `Functional` · `Damaged/Needs Repair` · `Unusable` · `Decommissioned` | KPIs, `Condition` filter |
| Solar | `Operational` · `Partially Operational` · `Non-Operational` · `Unknown` | KPIs, `Facility Status` / `System Status` |
| Spare Part | `Unknown` · `In Stock` · `Low Stock` · `Out of Stock` · `Discontinued` | KPIs, chip, filter |
| Spare Request | `Pending` · `Approved` · `Rejected` | KPIs, `Status` column |
| Activity equipment | `Operational` · `--` | `Equipment Status` column |
| Alert types | `WHO Hot Alarm` · `Maintenance Overdue` | Quick Actions feed |
| Activity types | `Installation` · `Planned Preventative Maintenance` | `Activity Type` filter |

Colour semantics (from the in-app glossary modal): Green = Functional · Red = Faulty ·
**Grey = Unknown** · **Orange = Decommissioned**.

In-app glossary copy, verbatim:
- `Functional - Working Properly (Green)` — Monitored CCEs within optimal temperature ranges
- `Faulty - Needs Attention (Red)` — Monitored CCEs with WHO temperature alarms
- `Status Unknown (Grey)` — Unmonitored or insufficient data
- `Decommissioned (Orange)` — CCEs that are no longer in use and are to be retired

## 13. Entity fields (observed)

**CCE** — `Make` · `Model` · `Equipment Type` · `Serial Number` · `Image` · `Facility` · `Region` ·
`Install Date` (sometimes year-only, sometimes full date) · `Capacity (L)` · `Age (Years)` ·
`Power Source` · `Shared Power` · `Funding Source` · `Deployment Status` · `Status` ·
`Maintenance Schedule` · `Maintenance Status` · `Last Service Date` · `Warranty Status` · `Device Type` ·
`Device IMEI` · QR assignment · association history (devices / facilities / regions).

**RTMD** — `Device Name` · `ID (MAC or IMEI)` · `Type` · `Serial Number` · `SIM ID` · `Facility` ·
`Top Level Region` · `Timezone` · `Power Source` · `Monitored Equipment` · `Status` ·
`Config Request Needed` · `Firmware Version` · `XT5 OTA Update Active` · `XT5 OTA Update URL` ·
`CTX WiFi SSID` · `CTX WiFi Password`.

**Solar** is three nested entities — Facility → System → Component. Unit of analysis on
`/equipment/solar` is the **facility**, not the item; structurally the odd one out.

**Journal entry** — `Date Reported` · `Activity Type` · `Technician Name` · `Region` · `Facility` ·
`CCE` (1..n) · `Capacity (L)` (1..n) · `Serial Number` (1..n) · `Monitoring Status` · `Equipment Status`.
Rows are **multi-valued** — one visit stacks several CCEs/capacities/serials in three cells.

## 14. RTMD configuration reference — real values + verbatim tooltips

Basic view = 4 + 2 fields; `Show Advanced` reveals 6 more. Footer links `Show Advanced` ·
`View Settings` · `Override Settings`. Scope line reads `Region Configuration: <region>`.

| Field | Observed value | `ⓘ` tooltip (verbatim) |
|---|---|---|
| `Upload Interval` | 1 hr | How frequently this device sends data to the server. |
| `Sampling Interval` | 10 mins | How frequently this device records data from its sensors. |
| `Sensor Disconnect` | 1 hr | Time since the base station last heard from an assigned sensor before an alarm is triggered. |
| `Power Out Duration` | 1 hr | Time since power outage before an alarm is triggered. |
| `Power Warning On` | No | Turns the audible power warning on or off. |
| `Buzzer On` | No | Turns the audible alarm on the base station on or off. |
| `Battery Low Percentage` | 20 | The percentage of battery power remaining that triggers a low battery alarm. |
| `Battery Low Duration` | 30 mins | Time below the configured percentage that triggers an alarm. |
| `Repeat Alarm Every` | 6 hrs | Time between alarms (if the alarm isn't resolved). |
| `Alarm Repeat Times` | 28 | The number of times the alarm will repeat at the configured interval. |
| `SMS Gateway` | africas_talking | The SMS gateway that this device uses to communicate settings with our server. |
| `Host` | coldtrace.org | The host to which this device sends its data. |
| `Dedupe Alarms (CTX)` | Yes | Whether or not to deduplicate alarms for CTX Base Stations and Sensors |
| `Centralized Alerts` | Yes | Determines whether device uses centralized alerts. |
| `Config Request Needed` | Yes / No | Whether the device needs to load the settings on this page or if it has already received them. The device will request its configuration the next time it sends data to our server. |
| `Timezone` | Africa/Nairobi | The timezone of the device (which is based on its region). |

**Per-sensor alarm config** — thresholds vary by equipment class, and alarm delays are **asymmetric**:

| Equipment class | `Temperature Alarms` (Low / High) | `Alarm Delays` (Low / High) |
|---|---|---|
| Ambient sensor | `0°C / 43°C` | `1 hr / 1 hr` |
| Vaccine refrigerator | `2°C / 8°C` | `1 hr / 10 hrs` — hot excursions tolerated 10× longer |
| Freezer (Haier HBD-265) | `-25°C / -15°C` | `10 hrs / 10 hrs` |

Config inheritance is three-tier: **system default → region configuration → per-device/per-CCE override**.
Tooltip, verbatim: "This alarm configuration is inherited from the CCE's region. Override this by creating
a custom configuration here or click \"View Region Config\" to update for all CCEs in the region."

## 15. Equipment Plot — the most important screen in the app

Full-bleed modal off a monitored CCE. Header `<make> - <model> | <facility>` + type tag +
`View in New Tab ↗` + `Print 🖨`.

- Date range `Start` / `Through`, default trailing ~30 days, with circular ← / → steppers.
- Metadata grid: `Facility` · `Installed` · `Device ID` · `Last Update` (age + last temp, e.g.
  `34 mins ago | 3.3°C`) · `Model & Sensor` · `Timezone`.
- Three summary tiles: `Avg Temp` · `Max Temp` · `Min Temp`.
- `Equipment Stats`: an excursion banner (`No Excursions` green / `No excursion data available` grey),
  then `Uptime` (100.0%) · `Time In Range` (30d 12h 6m) · `Time below 2°C` · `Time above 8°C` — the last
  two **interpolate the sensor's own thresholds into the label**.
- Chart: two stacked panels on a shared `Date and Time` x-axis. Top `Temperature in °C` with a **pink
  band above the high threshold, pale-blue band below the low**, dashed threshold lines, and the trace
  showing a daily defrost sawtooth. Bottom `Battery %` with a green band; full-height grey vertical bars
  mark upload gaps / power events. Hover = shared crosshair with temp + battery + timestamp bubble.
- Footer: `View CCE` · `View Device` · `Export as CSV` · `Close`.

Stat tooltips, verbatim: `Uptime` — "Percent of time equipment spent in the appropriate temperature range
for a particular time frame. Note: Today's uptime will vary depending on completeness of data at time of
viewing." · `Time In Range` — "Total time equipment spent in the appropriate temperature range" ·
`Time below X°C` — "Total time equipment was in a cold excursion" · `Time above Y°C` — "Total time
equipment was in a hot excursion".

## 16. Device Logs — where device truth actually lives

`/device/logs/:id`, header `ID: <imei>   Type: CT5`, note "All search and result times in Device's
timezone". Two sections:

- **`Recent Alarms`** — `Received Time` · `Active Sim` · `Sensor Connection` · `Sensor ID` ·
  `Battery Status` · `Battery Charge` · `Error Code` · `Error Message`. Page size 5. Observed content is
  almost entirely `Sensor Connection: Not Connected`, plus occasional `Battery Status: Alarm` with a
  `Battery Charge` value. `Active Sim`, `Error Code`, `Error Message` were empty on every row.
- **`Time Series Data`** — `Filter by Sensor` + `Select Time Range` toggle
  (ⓘ "Shows most recent data if unchecked. Max date range is 24 hours."). Columns `Received Time` ·
  `Recorded Time` · `Sensor` · `Event Type` · `Value`. Streams: `Temperature - A/B/C/D`, `Battery`,
  `Power Availability`, `Signal Strength - ss`. One `Received Time` covers many `Recorded Time`s — the
  hourly upload batching 10-minute samples. `Event Type` was blank on every row.

## 17. Maintenance — the two halves never meet

The **Preventative Maintenance Summary** (`/journal/:id/maintenance`) is a rich, read-only rendering of
the technician's form: info panel (`Equipment Make/Model` · `Serial Number` · `Equipment ID` (raw Mongo
ObjectId) · `Facility` · `Submitted on` · `By`), then `Have you conducted the maintenance? *` and four
Yes/No/N-A accordion sections:

- **General Condition** — clean and free from dust/debris · properly leveled and stable · no rust,
  corrosion, or damage · power supply connection secure and safe · power stabilizer/surge protector installed
- **Temperature and Performance** — readings stable and within range · cooling performance adequate ·
  temperature alarms functional
- **Electrical Components** — display clear and readable · control buttons responsive · interior lights
  working · visible wiring secure and undamaged
- **Preventive Actions Performed** — cleaned exterior · cleaned interior · checked door seals and gaskets ·
  calibrated temperature sensors · updated maintenance logs

Tail: `What is the current equipment status?` · `Follow up action?` · `General Comments:` ·
`Next date of service:`.

**Critical finding:** this record is linked from `Activity Log` but does **not** appear on the
corresponding CCE's `Maintenance History` tab, and the summary has no link back to the CCE. So the
`Overdue` chip is computed from `Maintenance Schedule` + `Last Service Date` (which is `--` on every
record inspected), not from any visit record. `Maintenance History` was empty on **every** CCE opened,
including the `Overdue` one.

`Previous Installations` → `Installation Detail` (`/journal/:id`): `Installation Date` ·
`Technician Name` · `Photos` (`No Images`) · `Region` · `Facility` · `RTMD IMEI/Hardware Address`
(several stacked) · `CCE` (several links, each a composite machine string). Single `Back` button, no
breadcrumb.

## 18. Create Service Request

`/tech-hub/create-request?equipment=<id>` — leaves Inventory, swaps the sidebar, shows **no equipment
summary**; the equipment lives only in the query string. Fields: `Region *` (not prefilled from the
equipment) · `Issue Type *` (`Equipment Functional Issue` · `Power Issue` · `Mechanical Issue` ·
`Display or Interface Issue` · `Accessory Issue` · `Connectivity Issue`) · `Issue Priority *` ·
`Due Date *` (`dd/mm/yyyy`) · `Contact Person *` (`Myself` / `Someone else`) · `Upload Images`
("Upload up to 3 images (.jpg, .jpeg and .png). Maximum total size: 25MB for all images") ·
`Notes *` (rich text: B / I / U / ordered list / bullet list / clear formatting, placeholder
`Enter description...`). Footer `CANCEL` / `SAVE`. Validation on blur: "This is a required field."

## 19. Layout patterns in the live product

**A. Canonical list page** — `breadcrumb → H1 + region control + Download + primary Add CTA → KPI card
row → toolbar (counted tabs left | search + Filters + Columns right) → table → pagination`.

**B. Two KPI card variants** — flat (label, number, optional trend badge) on list pages;
donut + sparkline + percentage footer on Health Status. Only the CCE list uses trend badges.

**C. List → detail** is two-column: main content ~70% + right rail of small single-purpose cards
(`Region & Facility`, `Associated Device`, `QR Code`). Entry is always an explicit `View` — never a
whole-row click.

**D. Tabs do three unrelated jobs** — cross-entity routing (`Equipment` | `Temperature Monitoring
Devices` actually navigates between `/equipment` and `/device`), filtering one list (`All 184` |
`Deployed 183`), and switching panels (`Description` | `Previous Installations` | `Maintenance History`).
Three visual treatments coexist: rounded pills, boxed folder tabs (RTMD Details), icon segmented
controls (Health Status).

**E. Filters have four implementations** — right drawer with `Reset All` / `Apply` (CCE, Passive, Solar);
anchored popover with `Clear` / `Apply Filters` and no heading (Spare Parts); inline auto-applying
(Activity Log); inline with explicit `Submit` (Performance, Electrification).

**F. Editing has three implementations** — modal (`Equipment Management Form`, `CANCEL`/`SAVE`
uppercase); inline field swap (RTMD Settings, `Save`/`Cancel` as text links); separate page
(`/equipment/:id/maintenance`).

**G. Region scoping is not plumbed consistently.** `/equipment`, `/equipment/passive`,
`/equipment/solar`, `/viz/*` share a `group` URL param. `/device` has its own single-select tree over the
**global** hierarchy and ignores `group`. `/journal` and `/spares` have no header region control at all.
Same account, three different scopes.

**H. `ⓘ` tooltips are load-bearing** on RTMD Settings — nearly every label is unintelligible without one,
and there is no inline helper text.

## 20. Still unseen — needs Raf's walkthrough

1. **Preventative maintenance reporting** (`/equipment/:id/maintenance`) — hard-gated behind a browser
   geolocation grant ("Location is only used for maintenance tracking… may be required by your Ministry
   of Health"). This is the whole PPM capture flow and the largest remaining gap.
2. **A `Decommissioned` CCE record** — *unreachable*, not just unvisited. KPI says `Decommissioned 1`;
   the `Functional Status = Decommissioned` filter returns `No Equipment found for the applied filters`
   and `Download ( 0 )`; the row is in none of the toolbar tabs.
3. **A CCE whose `Maintenance History` has content** — every PPM record found belongs to a region outside
   this account's Inventory scope, and there is no PPM → CCE link.
4. **An itemised excursion list** on the Equipment Plot.
5. Creation and bulk flows — `Add Equipment`, `Add Passive Equipment`, `Add Installation` (likely
   multi-step facility → system → components), `Install`, `Import Devices`, `Bulk Configuration`.
6. Destructive confirmations — `Decommission`, `Delete`, `Dissociate`, `Remove`, `Replace`.
7. `Assign QR Code` · `Revert Settings to Top Level Region Configuration` · `View Region Config` ·
   `Override` · spare-parts writes and the approve/reject transition · all `Download` / `Export` outputs.

---

# Part III — Analytics & Reports + Events (live audit, 2026-08-06)

~38 surfaces opened. Read-only; nothing saved, sent or downloaded.

## 21. The six modules, verbatim from `/home`

| Module | Description as the product states it |
|---|---|
| Equipment Management | "Manage your equipment and maintenance in one place" |
| Analytics & Reports | "Track performance for data driven decisions" |
| Training | "Your go-to hub for training materials and resources" |
| ColdTrace Transport | "Monitor all your vaccines while in transit" |
| **Events** | **"Manage notifications, subscriptions, and alerts"** |
| Health Tech Hub | "View and respond to health tech service requests" |

**Events is not incident tracking.** It is alert *delivery and subscription* plumbing — outbound SMS/email.
No event status, no severity, no assignee, no acknowledge/resolve. Incident workflow lives in Health Tech
Hub (service requests) and Equipment Management (service requests / PPM). Note also: "Home" in every
module sidebar leaves the module for the global launcher — there is no per-module home.

## 22. Analytics & Reports — IA

| Nav | Route | H1 | Breadcrumb chip |
|---|---|---|---|
| Overview | `/overview/{regionId}/{start}/{end}` | `<Region> Overview` | Overview |
| Reports Hub | `/reports` | Reports Hub | Reports Hub |
| Visualizations ▸ Maps | `/region-view/{regionId}/{start}/{end}?active_tab=rtmds` | `<Region>` (H2, pin icon) | Maps |
| Visualizations ▸ Daily | `/viz/grid?group=…&month=&report_type=&year=` | Daily Summary | `Daily Vizualization` *(typo)* |
| Visualizations ▸ Weekly | `/viz/dashboard?group=…&start=…&sort_by=name` | Weekly Summary | `Weekly Vizualization` *(typo)* |
| Visualizations ▸ Monthly | `/viz/summary/month?group=…&device_class=0&alert_type=nexleaf` | Monthly Summary | `Monthly Vizualization` *(typo)* |

Report sub-pages: `/reports/equipment-performance` · `/reports/activity?type=3|4` · `/reports/spare-parts`
· `/reports/service-request` · `/reports/summary`; instances at `?report={id}`.

## 23. Overview — KPI definitions (verbatim tooltips)

Filter strip is **inline with an explicit `Submit`** — never a drawer. Region is **required**; clearing it
puts the field in error and disables Submit. Default window = **preceding 31 days**, compared against a
caption naming the prior 31-day period. **No date presets anywhere in the product.**

Three KPI cards, each with a delta chip: `N Total Devices` (Active / Inactive / Never Sent Data) ·
`N Total Equipment` (Online / Offline) · `N Total Alarms` (Freeze / Heat).

- **Active** — "Devices that have sent data during the selected date range"
- **Inactive** — "Devices that have sent data in the past but have not sent data during the selected date range"
- **Never Sent Data** — "Devices that have never sent data"
- **Online** — "We consider an equipment to be online if we have received any data from it during the selected date range"
- **Offline** — "…if we have not received any data from it during the selected date range"
- **Freeze** — "A freeze alarm occurs when an equipment is below the freeze threshold for more than 30 mins"
- **Heat** — "A heat alarm occurs when an equipment is above the heat threshold for more than 120 mins"

Charts: `Device Trends` (Total | Active | Inactive; legend `Selected Dates` / `Preceding period`) ·
`Equipment Performance by Alarms` (Make | Model toggle; percent ⇄ counts; legend
`Cold Alarm` · `In-Range` · `Hot Alarm` · `No Data`) · `Regional Performance by Alarms` ·
`Equipment Monitored by Type` (rows `Refrigerators` / `Freezers`; legend `Sub-county` · `Health facility`).

## 24. Reports Hub catalogue

| Card | Route | Parameters | Output | Mode | History |
|---|---|---|---|---|---|
| Equipment Performance Report | `/reports/equipment-performance` | Region (Required), Start, End | `Download PDF` | On demand | 491 |
| Equipment Installation Activity | `/reports/activity?type=3` | Activity Type, Regions, Facility, Make/Model, Start, End | `Download` | Live table | — |
| Spare Parts Report | `/reports/spare-parts` | Region (Required), Start, End | `Download PDF` | On demand | 15 |
| Planned Preventative Maintenance Activity | `/reports/activity?type=4` | as above + `Columns` | `Download` | Live table | 934 rows |
| Service Request Report | `/reports/service-request` | Region (Required), Start, End | `Download PDF` | On demand | 38 |
| Summary Reports | `/reports/summary` | Region, Report Type, Report Period (filters only) | `View` inline PDF + `Download` | **Scheduled** | 541 |

Report list pattern: H1 → sub-heading `Generate Report` → inline strip (`Region (Required)`, `Start Date`,
`End Date`, `Generate Report` disabled until region chosen) → history table
(`Region` | `Period` | `Date Created` | `Actions`) → Material pager.
Instance pattern: `←` + H1 `<Report> for <Region> Region` + `Download PDF`, right rail
`Date Created` / `Period`.

Summary Report types: `Inventory` · `Maintenance` · `Training` · `Transport (NVO)` · `Transport (User)`.
Periods: `Weekly` · `30 Days` · `Monthly` · `Quarterly` · `Annual`. File type `PDF`.
Summary Reports render an **MoH-branded PDF inline**, not an HTML report.

### Performance definitions (verbatim footnotes) — these are the programme's real thresholds
- **Data Sufficiency** — "Sufficient data - CCEs sending ≥50% of expected data" / "Insufficient data - CCEs sending <50%"
- **Well/Poor Performing** — "Well performing - over 95% uptime" / "Poor performing - below 95% uptime" / "Only CCEs with sufficient data within the selected time period"
- **Hot Alarms** — "WHO heat alarm (fridges and WICs): at least 10 hours above 8°C" / "(freezers and WIFs): at least 1 hour above -15°C"
- **Cold Alarms** — "WHO freeze alarm (fridges and WICs): at least 1 hour below -0.5°C"
- **Power Performance** — "A CCE has power risk if it had any days with under 8 hours of power. This assumes that the CCE and RTMD are on the same circuit, and any solar powered CCE/RTMD are included."

### Maintenance status categories (Summary Report, verbatim)
`Critical - Long Overdue` (>90 days) · `Maintenance Overdue` (30–90 days) · `Maintenance Due Soon`
(<30 days) · `Recently Maintained` · `No Maintenance History`.
CCE Age buckets: `New (<1 year)` · `Mature (3-5 years)` · `Legacy (>5 years)` · `Unknown Age`
— **the 1–3 year band has no bucket.**

### Service Request Report — status definitions (verbatim)
`Completed` — "Service requests that have been finished" · `In Progress` — "currently being worked on" ·
`Open` — "available for assignment" · `Assigned` — "assigned to technicians".
Issue types: `Equipment Functional Issue` · `Power Issue` · `Mechanical Issue` ·
`Display or Interface Issue` · `Accessory Issue` · `Connectivity Issue` · `Safety Issue` ·
`Preventative Maintenance Due` · `Temperature Monitoring Device Issue` · `Other`.
**Every value was 0 on both instances opened**, including a 17-month window at a single facility —
this report is likely not wired to live service-request data.

## 25. Daily / Weekly / Monthly — three architectures, not one grid

| | Daily | Weekly | Monthly |
|---|---|---|---|
| Route | `/viz/grid` | `/viz/dashboard` | `/viz/summary/month` |
| Time control | Year + Jan–Dec chips | `Start Date` (single day) | Month + Year |
| Extra control | `Report Type` (Temperature / Power / WHO Alarms) | — | `Freeze Threshold` (`< 2°C` / `< -0.5°C`) |
| Row visual | 31 day cells with a number | dense heat-strip + `% in range` | one 100% stacked bar |
| Cell click | device-day modal | device-week modal | not clickable |
| Legends | 3 (`Fridge` / `Freezer` / `Alarms`) | 3 (`Heatmap Legend for Fridges` / `…Freezers` / `Alarms`) | 2 (`Chart Legend for…`), no Alarms legend |

Weekly/Monthly summary strip: `Total Number of Equipment` | `Number of Active Equipment` |
`Total % OK` | `Total % Freeze` | `Total % Hot` | `Total % No Data` | `Total WHO Freeze Alarms` |
`Total WHO Hot Alarms`.

Daily month chips: green = has data; **amber = the currently *selected* month** (not the current month);
grey = none/future.

Daily `Report Type` changes cell colour + tooltip only — the column header stays `Temperature Grid` in all
three modes (bug):
- **Temperature** — "…1322 min of data · 1322 min between 2°C and 8°C · 0 min > 8°C · 0 min < 2°C · max/min/avg temp"
- **Power** — "…1440 min of data · 1400 min nominal · 40 min no power"
- **WHO Alarms** — "…0 hot alarm(s) · 0 cool alarm(s)"

**Legend semantics differ between adjacent pages — a real trap:**
Daily is **duration-qualified** (red = "Above 8°C for more than 120 minutes"; blue = "Below 2°C for more
than 30 minutes"). Weekly is **instantaneous bands** (red = "> +8°C"; blue = "< +2°C") and adds an amber
tier `1 to 4 WHO Hot Alarms` vs red `≥ 5 WHO Hot Alarms` that Daily lacks. Freezer bands: Daily
"Above -15°C >120 min / Below -25°C >30 min"; Weekly "Between -15 and -25°C". There is **no Power legend
at all**. Panels are renamed three times: `Fridge Legend` → `Heatmap Legend for Fridges` →
`Chart Legend for Fridges`.

Weekly range tooltips (click, not hover): `7 Day Range` — "includes the selected start date and the next
6 days." · `30 Day Range` — "includes the selected start date, the next 6 days, and the previous 23 days."
Weekly footer credits "Visualization credit: UNICEF".

Equipment type badges on grid rows: `Fridge` · `Freezer` · `Ambient`.

The **device-day modal** (shared by Daily and Weekly, scoped by range) is the same Equipment Plot
documented in §15 — the best-designed surface in the product.

## 26. Maps — `/region-view/…`

Split layout: left rail (filters + drill list), right Leaflet/OSM map with a `← Kenya` drill-up chip,
zoom ±, legend top-right. Left rail: Region typeahead → H2 `📍 <Region>` → tabs `Devices | Alarms |
Uptime` → metric cards → sub-tabs `Regions | Facilities` → `Sort By: Severity` → scrollable list.

| Tab | Caption | Cards | Map legend |
|---|---|---|---|
| Devices | "Percentage of Devices that are active, inactive, and never sent data." | Active / Inactive / Never Sent Data | `>95% Devices Active` · `<95% Devices Active` · `No Devices Sent Data` |
| Alarms | "Number of alarms and CCEs with Devices for the specified date range." | Freeze / Heat | `Freeze Alarms` / `No Freeze Alarms` (or Heat) |
| Uptime | "Number of CCEs with Devices in optimal temperature range." | In Optimal Temp / Not in Optimal Temp / Unknown Optimal Temp | `>95% CCE in Optimal Temp` · `<95% CCE in Optimal Temp` |

Alarms tab adds `❄ Freeze Alarms` / `☀ Heat Alarms` — styled as two independent toggles but behaving as a
radio pair. **Neither map polygons nor left-rail region rows are clickable** — drill-down is only via the
typeahead. Facility rows expand via `View N CCEs ▾` into make/model, `SN:`, freeze/heat counts,
`Device ID:`, and `CT5 - Sensor B - Vaccine Refrigerator`.

## 27. Events module — IA and the alert model

| Nav | Route | H1 |
|---|---|---|
| Subscriptions ▸ Escalated Temperature | `/accounts/profile/subscriptions/daily` | Escalated Alert Subscriptions |
| Subscriptions ▸ Weekly Reports | `…/subscriptions/weekly` | Weekly Subscriptions |
| Subscriptions ▸ Monthly Reports | `…/subscriptions/monthly` | Monthly Subscriptions |
| Event Logs | `/events` | Event Logs |
| SMS ▸ SMS | `/sms` | SMS History |
| SMS ▸ Gateways | `/gateway` | Gateways |

**An "event" = a temperature/power excursion *interval*, plus its outbound notification.**
`Event Logs` columns: `Facility` | `Make/Model` | `IMEI4 + Sensor` | `Description` | `Start Time` |
`End Time` | `Duration (minutes)`. No status, no severity, no owner, no ID, no actions column.

### Alert lifecycle as actually implemented
1. RTMD reports data → excursion crosses a threshold for a qualifying duration.
2. Immediate device-level SMS. Verbatim template:
   `HOT Alarm: 19.5C at <facility>, RCW 50EG, Sensor B. Save your vaccines by referring to SOPs! 2026-08-06 09:50 EAT`
3. At each configured `Send Time`, a **digest** escalated alert to every subscriber of that region:
   `ESCALATED ALERT: <region>: NO DATA: Equipments Haier: HTC-110 (SN:…), … View more https://tz.coldtrace.org/viz/dashboard/?group=…&start=…`
4. The episode appears in `Event Logs` and in the Daily/Weekly/Monthly grids.
5. **No acknowledge, assign or resolve step.** Human action means opening a *service request* elsewhere.

### Five competing alarm vocabularies
| Surface | Terms |
|---|---|
| Overview KPIs / Maps | `Freeze` · `Heat` |
| Overview chart legends | `Cold Alarm` · `In-Range` · `Hot Alarm` · `No Data` |
| Equipment Performance Report | `In Range` · `Hot` · `Freezing` |
| Daily WHO Alarms tooltip | `hot alarm(s)` · `cool alarm(s)` |
| Escalated SMS body | `HIGH TEMP ALERT` · `LOW TEMP ALERT` · `NO DATA` |
| Subscription config | `Hot` · `Cold` · `Freeze` · `No Data` |

Subscription config treats **Cold and Freeze as two separate thresholds** — which no chart legend reflects.

### Subscription entity (`…/subscriptions/daily/{id}`)
Card `Subscription Information`: `Username:` · `Region:` · `Email notifications:` · `SMS notifications:` ·
`Send Times:` · `Hot:` · `Cold:` · `Freeze:` · `No Data:` · `Show All OK:`.
Actions `Edit subscription` / `Delete subscription`.

**Thresholds are per-subscription and user-set, not global.** Two records compared:

| Field | Record A | Record B |
|---|---|---|
| Email / SMS | off / on | on / on |
| Send Times | 9:30 AM (Africa/Nairobi) | 9:00 AM, 9:00 AM (UTC) — duplicate stored |
| Hot | 8 °C (5 hrs) | 8 °C (5 hrs) |
| Cold | 2 °C (1 hrs) | 2 °C (1 hrs) |
| Freeze | on, 1.5 °C (2 hrs) | on, **-1 °C** (2 hrs) |
| No Data | on, 12 hrs | off (row collapses) |

Create form (`…/daily/create`): `Subscription Region (Required)` · `Select user` (disabled until a region
is chosen — "Select a region before selecting a user") · `Select notification methods` (chips `Email`
`SMS`, both preselected) · `Send Time` (48 half-hour slots) + `Add Send Time` (repeatable) ·
`Hot Threshold` [8] °C / `Hot Duration` [5] Hours · `Cold Threshold` [2] °C / `Cold Duration` [1] Hours ·
☐ `Send Freeze Alerts` · ☐ `Send No Data Alerts` · ☑ `Send an "All OK" message when there are no issues.`
· `CANCEL` / `SAVE`. **No timezone field**, yet detail pages show both `Africa/Nairobi` and `UTC`.

Weekly subscription detail is minimal (username, region, email, SMS). Monthly adds
`Report Detail: Summary (1 to 2 Pages)`.

### Three separate notification concepts
1. **Events → Notifications** tab — delivery log, columns `Name` | `Notification` | `Message` | `Date`,
   **2,340,339 rows**; `Name` mixes phone numbers, emails and usernames in one column.
2. **SMS History** (`/sms`) — 536,918 rows. Columns `SMS Date` | `Origin` (`VaccineRTM`) | `Destination` |
   `Gateway` | `Direction` | `Device` | `SMS Content`. Has a `Send an SMS ✈` modal
   (`Phone number (required)` — "full international phone number including country code (no need for
   '+'). Separate multiple phone numbers with a comma." · `Message (required)` · `Select Gateway
   (required)`).
3. **In-app bell** — panel `Notifications`, empty state "You don't have any notifications",
   `Manage Notifications`.

### Gateways
Columns `Gateway` | `Type` | `Last Sent` | `Last Received` | `Actions`. 10 total.
Types: `smssync` · `fasthub` · `africastalking` · `beemafrica` · `clickatell` · `hence_digital`.
Detail card `Gateways Info`: `Gateway Id:` · `Gateway Name:` · `Gateway Type:` · `Last Sent:` ·
`Last Received:`. **No status field** — a gateway last used in 2015 looks identical to one used minutes ago.

## 28. Layout conventions across modules

Equipment Management's canonical list (breadcrumb → H1 + region + Download + Add CTA → KPI row → toolbar
with **counted tabs** → table → pagination; **right-drawer** filters; two-column detail with right rail)
is **not followed by Analytics & Reports or Events**:

- **Region never sits in the header** in these modules — it lives inside the filter strip.
- **No counted tabs anywhere** outside Equipment Management.
- **No filter drawers** — always an always-visible inline strip with an explicit `Submit`.
- **Four different pagers** coexist: Material `Items per page / 1–10 of N / ‹ ›`; numbered
  `« 1 2 3 4 5 »` + `Page 1 of 5` (grids); a first/last variant (Summary Reports); and **none at all**
  inside report-instance tables.
- KPI treatment varies: proper cards (Overview) · two loose centred stats (Daily) · a **bordered table
  styled as a KPI strip** (Weekly/Monthly) · plain number blocks (report instances).

Events is internally the most consistent module (one list shape, one pager, one detail shape). Analytics &
Reports contains at least five mutually incompatible page templates. The genuinely shared vocabulary
across all modules is: breadcrumb chips, the `ⓘ` tooltip, the green/amber/red/grey status palette, the
Material select + pager, and the inline filter strip with `Submit`. Everything above that layer diverges.

---

# Part IV — Health Tech Hub (live audit, 2026-08-06)

The **incident-workflow** half of the product. Equipment Management only links *into* it.

## 29. IA

| Nav | Route | H1 |
|---|---|---|
| Tech Hub Home | `/landing/tech-hub` | Tech Hub Home → "Select an Option" |
| Service Requests | `/tech-hub` | Service Requests |
| Admin View | `/tech-hub/admin` | Technician Performance |
| *(unlinked)* | `/tech-hub/create-request` | Create Service Request |
| *(unlinked)* | `/tech-hub/add-technician` | Add a technician |
| *(unlinked)* | `/tech-hub/:id?t=description\|openIssues\|history\|maintenance` | Job Details |

Landing is a 4-card menu with **no KPIs and no region control** — a click tax, not a dashboard.
Copy drift: card says `Enter Service Request`, list CTA says `+ Create Service Request`, route says
`create-request`, breadcrumb says `Create Request`, form H1 says `Create Service Request`.

## 30. Service request model

**`Job Status` — 7 values, verbatim from the Filters dropdown:**
`Unknown` · `Open` · `Assigned` · `In Progress` · `Paused` · `Completed` · `Cancelled`

This **contradicts the four-status Service Request Report** (§24), which lists only Open / Assigned /
In Progress / Completed. Live also ships `Paused` (with its own KPI card and a `Jobs Paused` admin
metric), `Cancelled` (via the `Cancel Job` button), and `Unknown` — a database null promoted to a
user-facing filter option.

**`Issue Priority`:** `Unknown` · `Low` · `Medium` · `High`. No Critical/Urgent, yet the Total Requests
KPI sub-label counts `High Priority` as the escalation signal.

**`Issue Type` (10) → `Issue` (dependent second level).** Types: `Equipment Functional Issue` ·
`Power Issue` · `Mechanical Issue` · `Display or Interface Issue` · `Accessory Issue` ·
`Connectivity Issue` · `Safety Issue` · `Preventative Maintenance Due` ·
`Temperature Monitoring Device Issue` · `Other`.
Sampled sub-list for `Display or Interface Issue`: `Screen/display not working` ·
`Touchscreen unresponsive` · `Buttons or knobs malfunctioning` · `Error codes displayed` ·
`Language or settings misconfigured` · `Other`.

**Entity fields:** `Job ID` (`JOB-<year>-<6hex>`) · `Region` · `Location`/`Facility` · `Equipment`
(composite string) · `Equipment Make and Model` · `Equipment Category` · `Last Serviced` ·
`Warranty Status` · `Issue Type` · `Issue` · `Issue Priority` · `Job Status` · `Request Date` ·
`Due Date` · `Requester Name` · `Contact Person` (`Myself`/`Someone else`) ·
`Contact Person On Site Name` · `Contact Person On Site Number` · `Technician Name` · `Notes` (rich
text) · `Equipment Photos` (≤3) · SLA chip.

### Lifecycle
```
create (Open) ──Assign Job──► Assigned ──► In Progress ──► Completed
      │                          │            │  ▲
      │                          │            └──┴── Paused
      └──── Cancel Job ──────────┴──────────────────► Cancelled
                                 └── reassign (counted as "Jobs Reassigned")
Unknown = data-quality bucket, not a workflow state
```
Only `Assign Job` and `Cancel Job` are exposed on an `Open` job. **Two competing metaphors in the copy:**
the admin pushes (`Assign Job`) while the empty technician value reads `Job not yet claimed` (technician
pulls). Only push exists in the UI.

**SLA:** `Due Date` is a **required field the requester sets at creation** — there is no auto-derived SLA
from `Issue Priority`. Overdue = `today − Due Date`, rendered as a red chip (`48 Days Overdue`) and a
counted `Past Due` tab. A `Medium` job was observed **48 days overdue, still `Open`, unassigned** — the
SLA is measured but nothing acts on it. No escalation, no notification surface.

## 31. Job Details anatomy

Tabs (drive `?t=`): `Job Description` · `Associated Open Issues` · `Service History` ·
`Maintenance History`. The middle two render the same table component and empty state as the list.

Left card: `Job ID` + three chips (priority, status, SLA) · `Equipment` (hyperlink, composite
`<serial> - <facility> - <make>|<model> - :<sensor>:<MAC>_<sensorId>`) · `Equipment Photos` ·
two-up grid `Equipment Make and Model` / `Equipment Category` / `Last Serviced` / `Warranty Status` ·
`Notes` (monospace) · `Issue` card rendering `<Issue Type>: <Issue>`.

Right rail: training promo card ("Check our our training modules for helpful tips!" — live typo) ·
`Request Date` / `Due Date` · `Location` · `Requester Name` / `Contact Person On Site Name` /
`Contact Person On Site Number` / `Technician Name` · collapsed `Order Spare Parts`.

Buttons: `Edit Job` · `Assign Job` · `Cancel Job`.

**There is no activity feed, no comment thread, and no status-change audit trail anywhere on the page.**
For an incident system this is the biggest structural gap: no record of who changed a status, no way for
technician and facility contact to exchange a note, and no reason captured for a pause or reassignment —
even though `Jobs Paused` and `Jobs Reassigned` are admin KPIs. The data is counted; the narrative is
discarded.

**The Job Details layout has no container for resolution notes, completion date, parts used, or a service
report.** If those exist for `Completed` jobs they are conditionally rendered — unverified.

## 32. Technician assignment — three disconnected surfaces

1. **`Assign Job` modal** — `Region` prefilled as a chip + `Technician` multiselect, placeholder
   `Select users`. **No workload, no job counts, no distance, no skills match, no availability, no
   suggestion.** A flat list of names.
2. **The skills model exists — but only at invite time.** `/tech-hub/add-technician` captures
   `User Regions` · `Email Address` · `Phone Number` · `First Name` · `Last Name` · `Occupation` ·
   `Equipment Expertise` · `Language`. **None of those four attributes appear in the picker where the
   dispatch decision is made.** `Equipment Expertise` is captured then never matched against the job's
   `Equipment Make and Model`.
3. **Workload/performance** lives in a third place — `/tech-hub/admin`: `Total Technicians` ·
   `Technicians with > 90%` · `Technicians with < 40%` · `Highest Points Earned` ·
   `Lowest Points Earned`; tabs `Top Performers` / `Top Delinquence` *(sic)*; columns
   `Technician ID` · `Technician Name` · `Jobs Completed` · `Jobs In Progress` · `Jobs Paused` ·
   `Jobs Reassigned` · `SR Completion Rate` · `Maintenance Completion Rate`. A retrospective
   leaderboard, not a dispatch tool, and unreachable from the assignment flow.

## 33. Create form — `/tech-hub/create-request`

| Field | Control | Req | Options / helper |
|---|---|---|---|
| `Region` | select (map-pin) | * | regions tree |
| `Issue Type` | select | * | the 10 values |
| `Issue` | select — **appears only after Issue Type** | * | dependent sub-list |
| `Issue Priority` | select | * | Unknown / Low / Medium / High |
| `Due Date` | date | * | mask `dd/mm/yyyy` |
| `Contact Person` | radio | * | `Myself` · `Someone else` |
| `Search for a contact` | autocomplete — **only when "Someone else"** | * | `Type to search...` |
| `Upload Images` | file, `Add Image` | — | "Upload up to 3 images (.jpg, .jpeg and .png). Maximum total size: 25MB for all images" |
| `Notes` | rich text (B/I/U, lists, clear) | * | `Enter description...` |

Footer `CANCEL` / `SAVE` (disabled until valid). Validation copy is the same string for every field:
`This is a required field.`

**The `?equipment=` deep link is broken.** `/tech-hub/create-request?equipment=<id>` renders
byte-identical to the bare form — nothing prefilled, and **there is no Equipment or Facility field on the
form at all**. So a web user cannot attach a request to a specific asset, only to a Region — yet Job
Details clearly carries a first-class equipment association. Equipment-linked requests must be created
from another client (mobile / QR scan), or the param name differs.

---

# Part V — ColdTrace Transport + Training (live audit, 2026-08-06)

## 34. Transport — a read-only forensic playback, not live monitoring

IA is two nav items: `Home` and `Transport` (`/trips`, H1 `ColdTrace Transport`). Detail at
`/trips/<24hex>` — **no `<h1>` element and no breadcrumb** on that page.

**There is no trip status vocabulary.** No `Status` field, no state chip, no `In Transit`/`Active`/
`Completed` anywhere. Every one of ~9,450 records carries a `Trip Duration`, i.e. is closed. There is no
Start Trip / End Trip surface in the web app — **trips are created and closed by the field mobile app**;
the web module is retrospective playback. So there is no lifecycle to design states for.

List is a **4-up card grid, not a table** — no columns, no sort, no KPI row, no tabs, no Download, no
Add CTA. Card fields: `Route` · `Region` · `Driver` (raw email) · `Trip Date` · `Trip Duration` ·
`Vaccine Coldboxes` (numbered MAC chips). Region + `Search` ("Filter trips by Route, Driver or Manager")
+ `Results Per Page` sit in a body filter panel with an explicit `Submit`. Pagination
`« 1 2 3 4 5 … 378 »` with **no total count**.

Detail (modal and standalone are identical): `Trip Overview` horizontal **stop stepper** (origin green
dot + timestamp → intermediate grey dots **with no timestamps** → destination red pin + timestamp) ·
`Trip Duration` · `Distance` · `Driver` · `Manager` · `Post Trip Survey`. Two-column: left Google Map
route trace, right scrollable `Vaccine Coldboxes` panel. Per coldbox: `Coldbox N - <MAC>` → temperature
chart → `Vaccines:` → `N Hot Excursion(s)` + cumulative duration · `N Cold Excursion(s)` + duration
(`--` when zero). Only actions: `View in New Tab` and `×`.

**`Post Trip Survey`** sub-labels are conditional and are the **only** thing that varies by trip outcome:
- Excursion trips: `Excursion reasons:` (e.g. "ColdBox was left open for too long during delivery") +
  `Actions taken:` (e.g. "Reduced opening time of the ColdBox during vaccine delivery", "Increased number
  of cool water packs")
- Clean trips: `Additional comments:` only

**Vocabularies.** Excursions: `Hot Excursion(s)` / `Cold Excursion(s)`. Container: `Coldbox` (spelled
`ColdBox` in survey prose). Vaccines: `BCG` · `bOPV` · `IPV` · `PCV-13` · `Td` · `HPV` · `MR` ·
`Rotavac` · `DTP-HepB-Hib`, each optionally suffixed **`(thawing)`** or **`(thawed)`**. Roles: `Driver`,
`Manager` (both raw emails, often the same person). Device: the **CTX** transport logger, one per
coldbox, identified only by MAC.

### Transport thresholds — the headline finding
Thresholds are **per-coldbox, driven by the payload's thaw state**, not fixed:

| Coldbox load | Hot threshold | Cold threshold |
|---|---|---|
| Static CCE reference (fridge) | 8 °C | **2 °C** (delays 1 hr low / 10 hrs high) |
| Coldbox with `(thawing)` vaccines | 8 °C | **≈ −25 °C** |
| Coldbox with `(thawed)` vaccines | 8 °C | **2 °C** |

The upper limit matches CCE; the lower limit swings **27 degrees** on thaw state. **No alarm-delay values
are exposed anywhere in Transport** — no equivalent of the asymmetric 1 hr / 10 hrs delays; a 13-minute
hot excursion was recorded, so excursions appear to log near-instantaneously. Thresholds are never shown
as text — only as unlabelled dashed lines.

**Alerting: nothing in the UI.** No recipients, no notification log, no acknowledgement. Excursions
surface only retrospectively as counts + cumulative minutes plus the free-text survey.

**The chart is NOT the Equipment Plot.** A separate, simpler visualisation: one temperature series with
markers recoloured by excursion state (green in-range / red hot / blue cold), two dashed threshold lines,
x-axis clock times only (no date), y-axis **auto-rescaling per coldbox** (−28…12 for thawing, 0…12 for
thawed — so two coldboxes on one trip are drawn on different rulers). Tooltip prints
`Temperature: 9.6` **with no unit**. No battery series, no `Uptime`, no `Time In Range`, no legend, no
threshold-band shading, no zoom/brush.

## 35. Training

IA: `Training` (`/training`) · `Training Admin` (`/training/admin`), plus `/training/<trackId>`,
`/training/<trackId>/category/<catId>`, `/training?t=learning&st=…`, `/training?t=community`,
`/training/new/lesson`.

**Content structure is 4 levels described with 5 words:**
`Training Track` → `Category` / `Sub Category` → `Course` → `Lesson`.
Tracks (5, verbatim): `ColdChain Equipment` · `Solar Equipment` · `Oxygen Equipment` · `Lab Equipment` ·
`Operational Skills`. Categories under ColdChain Equipment: `ColdTrace Dashboard` ·
`Remote Temperature Monitoring Devices` · `Cold Chain Equipment` · `ColdTrace Transport`.

**`Lesson Type`** is a first-class dimension: `Reference Material` (always unlocked) vs sequenced lessons.
These are the two pill tabs inside a category.

**Content types:** `PDF` and `Video` only; a lesson can carry both. PDFs render inline with zoom; videos
in a standard player — **no completion event, no "Mark complete", no next/previous navigation.** A
pre-training assessment exists (action `Start`) implying a quiz surface, unentered.

**Progress is tracked per user:** `My Learning` sub-tabs `My Favorites` / `Completed` / `In Progress` /
`Not Started`; `Status`, `Start Date`, `Completion Date` columns; sequencing enforced via
`Please complete previous lessons in the course first.` **No certificates anywhere.** No self-enrolment —
assignment is admin-driven via `Assign Lesson` (users → lessons → Assign), with `Assigned By` recorded.

**Localisation is first-class:** `Language *` required per lesson, lessons authored as language variants
(`Language 1` + `+ Upload in a different language`), a language selector in the category header, and a
`Language` column in admin (`English`, `French`, `Kinyarwanda`). But the learner-facing home **mixes
English and Kinyarwanda cards in one grid with no language indicator and no preference**.

**`/training/admin` is the one screen in Transport-or-Training that follows the canonical pattern:**
breadcrumb → H1 + `Assign Lesson` CTA → 4 KPIs (`Total Assigned Courses` 5307 ·
`Total Not-Started Courses` 2355 · `Total In Progress Courses` 165 · `Total Completed Courses` 2787) →
tabs (`All Lessons` / `User Detail` / `User Summary`, uncounted) → table → pagination. `Filters` is a
**popover, not a right drawer**, pre-set to `Region = Nairobi`.

`User Detail` columns: `Name` · `Role` · `Facility` · `Level 2 Area` · `Level 1 Area` · `Course Name` ·
`Lesson Title` · `Assign Date` · `Start Date` · `Completion Date` · `Status` · `Assigned By` · `Actions`.

**Community tab is a Q&A forum** — `Post a question`, category chips (`ColdTrace Dashboard`,
`Cold Chain Equipment`, `Vaccine Management`, `ColdTrace Transport`), `N likes` / `N replies`. No search,
filter, sort or pagination. **Three of the five most-liked posts are the same unanswered access
complaint** — the forum is functioning as an unmonitored bug tracker.

`Create Lesson` form: `Category *` · `Sub Category *` · `Lesson Type` · `Regions` (optional) ·
☐ `Should be visible only to assigned users` · `Lesson Thumbnail *` (.jpg/.jpeg/.png) · accordion
`Language 1` { `Language *`, `Lesson Title *`, `Lesson Description *` (rich text), `PDF`|`Video` toggle,
`Add PDF` } · `+ Upload in a different language`. Footer `Cancel` / `Create Lesson` plus a content
disclaimer.

---

# Part VI — Administration and the configuration model (live audit, 2026-08-06)

## 36. Admin routes

| Route | H1 | Purpose |
|---|---|---|
| `/users` | Users | Directory, 1371 users |
| `/users/invite` | Invite Users | Invite form — **the only place permissions are set** |
| `/users/:id` | My Profile | User detail |
| `/users/:id/update` | Update Account | Edit user (**no permission fields**) |
| `/group` | Regions | Region tree — **3007 nodes on one page** |
| `/group/:id` | Region Detail | Region + admins + gateway |
| `/group/:id/update` | Update region `<name>` | Edit region |
| `/group/create?parent=:id` | — | Create child region |
| **`/device/bulk-config/:group`** | `<Region>` Configuration | **THE region-level configuration screen** |
| `/facility` | Facilities | Facility list |
| `/facility/:id` | Facility Details | Detail + RTMD alarm contacts |
| `/facility/:id/edit` | Edit `<facility>` | 5-step wizard |
| `/gateway` | Gateways | SMS gateway registry |

**`/accounts/profile` no longer resolves** — it 302s to `/home`, while its children
(`/accounts/profile/subscriptions/*`) still work. The canonical own-profile route is `/users/:id`.

## 37. Configuration inheritance chain — definitive

Region config lives at **`/device/bulk-config/:groupId`**. Page copy: *"Bulk Configuration — Use this page
to set alarm or device configurations at a region level"*.

```
TIER 0  System default
        label: "Default Configuration" / "Default Configuration for a <Equipment Type>"
        action: [Override]
           │
TIER 1  Top-level region (e.g. Kenya)
        label: "Custom Configuration set for <Region>"
        actions: [Update] [Remove]      ← Remove reverts this tier to Tier 0
           │
TIER 2..n  Child region (e.g. Nairobi under Kenya)
        label: "Configuration inherited from <Parent Region>"
        actions: [View] [Override]      ← View walks the chain upward
        GENERAL DEVICE SETTINGS ARE LOCKED HERE:
        "Device Configuration can only be edited on Top Level Regions"
        (alarm configs CAN still be overridden at every region tier)
           │
TIER n+1  Individual device / CCE
        label: "Region Configuration: <region>"
```

**Governance asymmetry:** General Device Settings are editable **only at top-level regions**; Alarm
Configurations are overridable at **every** region tier and again per device. Same screen, two different
rules, no visual separation.

### General Device Setting Configuration — 14 fields
`Upload Interval` 1 hr · `Sampling Interval` 10 mins · `Repeat Alarm Every` 6 hrs ·
`Alarm Repeat Times` 28 · `Sensor Disconnect (CTX)` 1 hr · `Dedupe Alarms (CTX)` Yes · `Buzzer On` No ·
`Upload on Power Out(CT5)` No · `Battery Low Percentage` 20 · `Battery Low Duration (CT5)` 30 mins ·
`Power Out Duration` 1 hr · `Host` coldtrace.org · `APN Name(CT5 only)` www · `Centralized Alerts` Yes.

Notable tooltip, verbatim — `Upload on Power Out(CT5)`: "This forces an upload when power is lost and when
power is restored. For 99% of deployments leave this off. For any deployments with solar panels powering
CT5, leave this off. If you think you need this please consult with the tech team."

### Device Alarm Configurations — 9 equipment types × 5 fields
Fields: `Cold Threshold` · `Cold Duration` · `Hot Threshold` · `Hot Duration` · `Door Open Duration`.

| Equipment Type | Cold Thr | Cold Dur | Hot Thr | Hot Dur | Door Open |
|---|---|---|---|---|---|
| Unknown | 0 °C | 1 hr | 43 °C | 1 hr | 10 mins |
| Ambient | 0 °C | 1 hr | 43 °C | 1 hr | 10 mins |
| Vaccine Freezer | −25 °C | 10 hrs | −15 °C | 10 hrs | 10 mins |
| Vaccine WIFR | −25 °C | 10 hrs | −15 °C | 10 hrs | 10 mins |
| **Vaccine Refrigerator** | 2 °C | 1 hr | 8 °C | 10 hrs | 10 mins |
| **Vaccine WICR** | 2 °C | 1 hr | 8 °C | 10 hrs | 10 mins |
| Ultra Cold Chain | −90 °C | 1 hr | −60 °C | 1 hr | 10 mins |
| Cold Box | 0 °C | 1 hr | 43 °C | 1 hr | 10 mins |
| Vaccine Carrier | 0 °C | 1 hr | 43 °C | 1 hr | 10 mins |

**`Door Open Duration` (10 mins) is a threshold that appears nowhere else in the product** — no door-open
alarm surfaces in any list, chart, KPI or alert vocabulary.

Only 14 `ⓘ` icons exist on the page, all on General Device Settings. **The 45 alarm-threshold fields —
the clinically consequential ones — have no tooltips at all.**

## 38. Roles and permissions — the real model

**There is no named-role model and no role dropdown.** Authorisation is four region-scoped lists on the
user record plus two booleans. The invite form's help text is the authoritative permission spec:

| Field | Help text (verbatim) | Grants |
|---|---|---|
| `User Regions` | "The region in which the user can install devices and view data of these devices." | install + read |
| `Primary Region (Required)` | "The user will see data for this region when they go to their homepage." | default landing scope only |
| `Read Only Regions` | "The region in which the user can view device data. This user cannot install devices or invite other users." | read |
| `Admin Regions` | "The region in which the user can install devices, view device data, and invite other users. This user also has the ability to generate reports/subscriptions in this region." | install + read + invite + reports/subscriptions |

One user can be admin in region A, installer in B and read-only in C simultaneously — which is why the
user list can only show a binary `Admin` Yes/No column. `User Role` on the detail shows `Staff` (the
Django-style flag). `Impersonate` is a row action on **every** user plus a global utility-bar button.
`Anonymize Data` is an unlabelled checkbox on the invite form.

**`Occupation` (8, verbatim) — not roles, though they read like them:** `Biomedical Engineer` ·
`Biomedical Technician` · `Cold Chain Technician` · `EPI Supervisor` · `Health Center Manager` · `Nurse` ·
`Partner` · `Vaccine Handler`. Note `Head of Health Centre` (seen in Training) is **not** in this list —
`Health Center Manager` is. Two vocabularies, two spelling conventions.

**Confluence's "dashboard account types" does not map to anything live.** The real model is the four
region lists + `Staff` + `Admin`.

**User status model is `Active: Yes/No` only.** No Invited / Pending / Disabled state; `Date Joined`
renders `--`. No audit trail beyond `Last Login`.

`Language` options (6): `Arabic` · `English` · `Spanish` · `French` · `Portuguese` · `Swahili`.
`Timezone` exposes the raw IANA database (`W-SU`, `Zulu`, `Universal`, `US/Indiana-Starke`).

## 39. Facility entity

List columns: `Facility Name` · `Region` · `Contacts` · `Facility Code` · `Energy Source` ·
`Power Availability` · `Actions`. Optional columns: `Latitude` / `Longitude`.

Detail: sub-tabs `CCE Data` / `Solar Summary`; sections `Solar Overview`, `Systems`,
`Issues Requiring Action`; buttons `View Another Facility`, `Edit Facility`,
`Set this as my primary facility`, `Add or create a contact`, `View Contacts`.

**RTMD alarm contacts** — copy verbatim: `A facility can have up to 5 RTMD alarm contacts.` /
`No contacts currently in this facility.` Expanded: a `Contacts` typeahead (attach existing) **plus**
`Create a new contact`. So contacts are a **shared, reusable entity** attached to facilities, not
facility-owned fields — which is why contact records appear in `/users` with a `View Contact` action.
The 5-contact cap is prose only: no `2 of 5` counter, no stated behaviour at the limit.

Edit is a **5-step wizard**: `1 Identification & Location` · `2 Supply Chain & Logistics` ·
`3 Vaccine Services & Cold Chain` · `4 Transport & Waste Management` · `5 Facility Staff`.
- **1:** `Region *` (label duplicated as `Region (Required)`), `Facility Name *`, `Facility Code`,
  `Enter Facility (GPS) Coordinates` → `Latitude` / `Longitude` / `Use My Location`, `Facility Type`,
  `Status`, `Total Population Served` ("Catchment area population")
  - `Facility Type`: `Facility` · `Province` · `Division` · `District` · `Tarluka/Thesil` *(sic —
    Taluka/Tehsil, India-specific vocabulary in a global product)*
  - `Status`: `Public` · `NGO` · `Private`
- **2:** `Facility Source of Energy`, `Availability of Electricity`, `Vaccine Supply Point`,
  `Supply Interval (months)`, `Safety Stock Level (months)`, `Mode of Vaccine Supply`, `Supply Levels`
- **3:** `Vaccination Strategy`, `Coverage Penta-3 (%)`, `Cold Boxes (Large)`, `Cold Boxes (Small)`,
  `Vaccine Carriers (Large)`, `Vaccine Carriers (Small)`
- **4:** `Motos`, `Pick-ups`, `Refrigerated Vehicles`, `Waste Vehicles`, `Incinerators`,
  `Waste Disposal Notes`
- **5:** `Number of Epi Nurses and Vaccine Handlers`, `Number of Biomedical Engineers and Technicians`

**`Facility Type` mixes an actual facility with four administrative tiers** — so "type" is really
"hierarchy level". The facility table doubles as the administrative-geography table, which is what
surfaces in reports as `Facility` → `Level 2 Area` → `Level 1 Area`. **Two unreconciled hierarchies
exist:** the Region tree and the Facility-Type tiers.

## 40. Region entity

`/group` renders a fully-expanded nested tree of **3007 nodes in one DOM page** — no pagination, no
search, no collapse-all. Depth up to **8 levels** (L1=185, L2=284, L3=1333, L4=406, L5=794, L6=2, L7=1,
L8=2).

Per-node actions: `View Details` · `Update Region` · `Add Child Region` · **`Delete Region`** ·
**`Reprocess equipment`** — all at identical visual weight in a flat `<ul>`.

Detail fields: `Name:` · `Hierarchy:` (linked parent chain) · `Timezone:` · `Gateway:` (linked) ·
`Administrators:` (linked user list). Shortcut row → `Contacts`, `Devices`, `Equipment`, `Facilities`,
`Users`.

Edit fields: `Name (required)` · `Parent Region` — **"Leave blank to make this region a top level
region"** · `Timezone (Required)` · ☐ `Update subregions' time zones`.

**Critical coupling:** `Parent Region` is the switch that decides top-level status — and top-level status
is exactly what determines whether General Device Settings can be edited (§37). Clearing `Parent Region`
silently changes the configuration-authority model for every device beneath. The form says nothing about
this. Also, `Gateway` and `Administrators` appear on the detail view but are **absent from the edit
form** — managed somewhere unknown.

**Test fixtures are interleaved alphabetically with production country programmes, unmarked:**
`0919_LA_devices`, `Aaviza CTX Testing`, `all_gateways`, `All_LA_coldtrace_devices`,
`ArthiSubscriptionTest`, `BLE_New_US_devices`, `BLE_Testing_IN`, `BLE_Testing_Odisha`, `BLE_UP`,
`BLE_US_testing`, `chris testing`, `ColdTrace Demo`, `us_trek_sub`.

## 41. Admin layout languages

The administration surfaces **predate or ignore the canonical list pattern entirely** — four distinct
layout languages in one admin area:
- Users / Facilities / Gateways: Angular Material table + paginator, inline toolbar, no breadcrumb, no
  KPI row, no counted tabs, no filter drawer.
- Regions: a bespoke recursive card tree with no search or pagination.
- Bulk Configuration: a bespoke label/value form where inheritance state is a **sentence**, not a
  component.
- Facility Detail: a bespoke card stack with actions scattered rather than collected in a header bar.

Detail pages consistently lack the right rail; the user detail is the one exception.

Global chrome on every admin page: a `app-alert-message` banner slot, a top utility bar
(`Navigation`, `Notifications`, `Manage Notifications`, `Profile Account`, `Impersonate`), and a floating
**"Nexleaf AI" / `Ask AI`** chat launcher that overlays every screen including the destructive Regions
list.

## 42. Admin surfaces that do not exist in the web app

No route exists for: **funding sources**, the **equipment make/model catalogue**, the **spare-part
catalogue**, **API keys / integrations**, or **gateway creation** (no create CTA). `/spares` is
operational (request/restock), not catalogue admin. These are presumably Django-admin-only — worth
confirming. **No 2FA surface was found anywhere.**

---

## Manual temperature recording — the time windows  (recorded 2026-08-27, from Raphael)

Two separate windows. They are **not** the same rule and must not be collapsed into one.

| Window | Length | What it governs |
|---|---|---|
| **Past recording** | **7 days** | How far back a user may go to *enter a reading that was never recorded*. A missed day can be filled in for up to 7 days. |
| **Amendment** | **3 days** | How long an *already-saved* reading stays editable. After 3 days the reading is frozen. |

So a reading from 5 days ago: the day is still inside the **7-day past-recording** window, but a
value already saved for it is **outside the 3-day amendment window** — you could record a missing
reading, but not change one that exists. The two windows expire independently.

### What this means on screen

- **Past Entry mode** (`W1h`, `W3`) is the 7-day window. The Recording Date bar names the date being
  recorded against, so a user cannot mistake it for today.
- **Amendment window expired** (`W3a`) is the 3-day window closing. Saved readings become read-only;
  the copy already on canvas points the user at a supervisor.
- The **`Amended`** badge in the legend marks a reading that was changed inside its 3-day window.
  `Past Entry` marks one recorded late inside the 7-day window. **Different badges, different rules.**

### ⚠ Gap — the amendment / edit flow itself is not designed

The state set covers *entering* past readings and the *expiry* of the amendment window. It does not
cover the amendment journey: opening a saved reading, editing the value, confirming the change,
seeing it marked `Amended`, and whatever audit trail the change leaves. Raphael flagged this as
missing on 2026-08-27.

### Open questions — do not guess these

1. Is each window counted from the **reading's date** or from **when it was saved**? For a reading
   entered late, those differ.
2. Are the boundaries inclusive — is day 7 the last day you can record, or the first day you cannot?
3. Does an amendment need a **reason or an audit entry**, and who can see it?
4. Can a **supervisor override** either window, and is that a different screen?
