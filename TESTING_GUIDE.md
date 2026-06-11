# Auralis Hotel — Verification and Testing Manual

This manual provides a comprehensive, step-by-step verification plan for **Step 9: Room Service & Profiles UI** and all subsequent development steps (Steps 10 through 13). It details the required modules, environmental variables, database configurations, and instructions to verify that each layer functions flawlessly.

---

## 📋 Table of Contents
1. [Prerequisites & Dependencies](#1-prerequisites--dependencies)
2. [Testing Step 9: Room Service & Profiles UI](#2-testing-step-9-room-service--profiles-ui)
3. [Testing Step 10: Front-Facing API Endpoints](#3-testing-step-10-front-facing-api-endpoints)
4. [Testing Step 11: Admin Framework & Shell](#4-testing-step-11-admin-framework--shell)
5. [Testing Step 12: Admin Control Dashboards](#5-testing-step-12-admin-control-dashboards)
6. [Testing Step 13: Admin Aggregation APIs](#6-testing-step-13-admin-aggregation-apis)
7. [💡 Advanced Troubleshooting Tips](#-advanced-troubleshooting-tips)

---

## 1. Prerequisites & Dependencies

Before executing or testing any part of the application, ensure your local development workspace contains the required modules and runtime settings.

### 📦 Node.js Packages (Modules to Install)
All primary libraries are already defined in [package.json](file:///c:/Ai%20powered%20hotel%20management%20system/auralis-hotel/package.json). To download and install all of them at once, run:

```bash
npm install
```

This will download:
*   **Next.js (v16.2)** & **React (v19.2)**: Core web framework and runtime.
*   **Prisma Client & Prisma (v5.22)**: Database Object-Relational Mapping (ORM) engine.
*   **NextAuth.js (v4.24)** & **@next-auth/prisma-adapter**: Authentication and session state providers.
*   **BcryptJS (v3.0)**: Secure hashing library for user passwords.
*   **Lucide React (v1.14)**: Modern visual vector iconography.
*   **Framer Motion (v12.38)**: Liquid animations and components.
*   **React Hot Toast (v2.6)**: Real-time action popups and notifications.
*   **Recharts (v3.8)**: Administrative performance charts.
*   **Nodemailer (v7.0)**: Direct SMTP mail transport for guest notifications.

---

### 🔑 Environment Setup (`.env` and `.env.local`)
Create or edit your local environmental credentials inside the file [**`.env`**](file:///c:/Ai%20powered%20hotel%20management%20system/auralis-hotel/.env):

```env
# 1. PostgreSQL Connection String (adjust user, password, host, and port as needed)
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/auralis_hotel?schema=public"

# 2. NextAuth Cryptographic Security Salts & URLs
NEXTAUTH_SECRET="auralis_hotel_super_secure_random_string_32_chars_minimum"
NEXTAUTH_URL="http://localhost:3000"

# 3. SMTP Mail Configuration (Nodemailer setup for confirmations)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-gmail-app-password"
SMTP_FROM="Auralis Hotel <no-reply@auralishotel.com>"
```

---

### 🗄️ Database Initialization & Seeding
Once environment parameters are set, deploy the PostgreSQL schema and populate the initial database state:

```bash
# 1. Generate local Prisma Clients matching the database schema
npx prisma generate

# 2. Push schema details directly into your PostgreSQL database
npx prisma db push

# 3. Seed default inventory (luxury suites, dining menus, and admin profile)
node prisma/seed.js
```

> [!NOTE]
> The database seed script initializes a default Admin profile:
> * **Email:** `admin@auralishotel.com`
> * **Password:** `Admin123!` (or the standard password specified in `seed.js`)

---

## 2. Testing Step 9: Room Service & Profiles UI

This step deals with **client-facing pages** handling food selections, shopping carts, and customer history displays.

```mermaid
graph TD
    A[rooms/page.jsx] -->|1. View Food Menu| B[food/page.jsx]
    B -->|2. Add to Cart| C[Cart Drawer]
    C -->|3. Submit Order| D[api/food-orders]
    E[profile/page.jsx] -->|4. View Order Logs| F[Personal Dashboard]
```

### 🛠️ Execution Checklist
1. Start your local development environment:
   ```bash
   npm run dev
   ```
2. Open your web browser and navigate to `http://localhost:3000`.

### 🧪 Verification Steps

#### Test Case 9.1: Interactive Dining Menu & Categorization
*   **Action**: Go to `http://localhost:3000/food`.
*   **Expectation**: 
    *   The page displays a luxury navigation structure with category tabs: **Breakfast**, **Lunch**, **Dinner**, **Snacks**, and **Drinks**.
    *   Clicking different tabs correctly filters the displayed items using smooth Framer Motion animations.
    *   Each card ([`FoodCard.jsx`](file:///c:/Ai%20powered%20hotel%20management%20system/auralis-hotel/src/components/customer/FoodCard.jsx)) exhibits luxury micro-interactions, showing the dish's price, descriptive content, and a gold-styled "Add to Cart" control.

#### Test Case 9.2: Shopping Cart Side-Drawer Engine
*   **Action**: Click "Add to Cart" on multiple items and adjust quantities.
*   **Expectation**:
    *   The cart counter updates dynamically.
    *   Clicking the shopping cart trigger slides open the glassmorphic **Cart Drawer**.
    *   The drawer details itemized selections, prices, and calculates subtotals dynamically using helper methods in [`utils.js`](file:///c:/Ai%20powered%20hotel%20management%20system/auralis-hotel/src/lib/utils.js).
    *   Clicking "Place Order" should successfully trigger a loading indicator (and post to the database once Step 10 endpoints are built).

#### Test Case 9.3: Customer Profile Hub
*   **Action**: Sign in using a standard Guest account, then navigate to `http://localhost:3000/profile`.
*   **Expectation**:
    *   The component loads the user's details (initials, name, email) from the NextAuth session state.
    *   Clicking **Personal Information** displays custom form fields (Full Name, Phone, Address) and permits updating. Click "Save Changes" to test form feedback (a toast pop-up saying *"Profile updated!"*).
    *   Clicking **Bookings** shows your historical suite reservations.
    *   Clicking **Food Orders** displays a chronological timeline of your dining orders with dynamic badge styling (e.g., green for `DELIVERED`, orange for `PREPARING`, red for `PENDING`).

---

## 3. Testing Step 10: Front-Facing API Endpoints

Step 10 links customer-facing components to **backend serverless API routes**. We must verify that CRUD requests safely retrieve, create, update, or remove database entries.

### 🧪 Verification Steps (Using Postman, Thunder Client, or cURL)

#### Test Case 10.1: Room Directory & Reservation API (`/api/rooms`)
*   **Test GET (Fetch Available Suites)**:
    *   **Method**: `GET`
    *   **URL**: `http://localhost:3000/api/rooms`
    *   **Expectation**: Returns `200 OK` with a JSON list of seeded suites.
*   **Test POST (Book a Suite)**:
    *   *Note: Needs user session context.*
    *   **Method**: `POST`
    *   **URL**: `http://localhost:3000/api/rooms`
    *   **JSON Body**:
        ```json
        {
          "roomId": "room_cuid_from_get_response",
          "checkIn": "2026-06-01T14:00:00.000Z",
          "checkOut": "2026-06-05T11:00:00.000Z",
          "guests": 2,
          "notes": "Prefer high floor and extra pillows, thank you."
        }
        ```
    *   **Expectation**: Returns `201 Created` with a full reservation object. An automated HTML booking receipt email is sent to the guest.

#### Test Case 10.2: Room Spec & Modification API (`/api/rooms/[id]`)
*   **Test GET (Retrieve Specific Suite)**:
    *   **Method**: `GET`
    *   **URL**: `http://localhost:3000/api/rooms/ROOM_ID`
    *   **Expectation**: Returns the specific room details matching the ID.
*   **Test PUT (Update Room Details - Admin Only)**:
    *   **Method**: `PUT`
    *   **URL**: `http://localhost:3000/api/rooms/ROOM_ID`
    *   **JSON Body**:
        ```json
        {
          "price": 450.00,
          "status": "MAINTENANCE"
        }
        ```
    *   **Expectation**: Returns `200 OK` with updated attributes.

#### Test Case 10.3: Dining Menu API (`/api/food`)
*   **Test GET (Fetch Menu Catalog)**:
    *   **Method**: `GET`
    *   **URL**: `http://localhost:3000/api/food`
    *   **Expectation**: Returns the complete list of food items grouped by dining categories.

#### Test Case 10.4: Dining Order Management API (`/api/food-orders`)
*   **Test POST (Submit Room Service Order)**:
    *   **Method**: `POST`
    *   **URL**: `http://localhost:3000/api/food-orders`
    *   **JSON Body**:
        ```json
        {
          "roomNumber": "304",
          "items": [
            { "id": "food_item_cuid", "name": "Classic Eggs Benedict", "price": 22.0, "quantity": 2 }
          ],
          "totalAmount": 44.0,
          "notes": "Egg yolks runny please."
        }
        ```
    *   **Expectation**: Returns `201 Created`.
*   **Test GET (Fetch Active User Order History)**:
    *   **Method**: `GET`
    *   **URL**: `http://localhost:3000/api/food-orders`
    *   **Expectation**: Returns a historical list of orders placed by the currently logged-in account.

---

## 4. Testing Step 11: Admin Framework & Shell

This phase implements security checks and wraps dashboards in an **Admin Layout** featuring administrative sidebars and status trackers.

```
       Admin Login Route (http://localhost:3000/login)
                         │
                         ▼
        [middleware.js] Authentication Guard
                         │
     🛡️ Checks: Active Session + Role === 'ADMIN'
          ┌──────────────┴──────────────┐
          ▼                             ▼
   [Role: GUEST]                 [Role: ADMIN]
 🚫 Redirects to /             🔓 Renders Admin Shell
                                 ├── Sidebar.jsx
                                 ├── AdminHeader.jsx
                                 └── StatsCard.jsx
```

### 🧪 Verification Steps

#### Test Case 11.1: Security Middleware Guard & Role Verification
*   **Action 1**: Log out of any active sessions. Try navigating directly to `http://localhost:3000/admin`.
*   **Expectation 1**: [`middleware.js`](file:///c:/Ai%20powered%20hotel%20management%20system/auralis-hotel/src/middleware.js) intercepts the request and redirects you to the `/login` portal.
*   **Action 2**: Log in as a standard `GUEST` user and navigate to `http://localhost:3000/admin`.
*   **Expectation 2**: The layout intercepts the request, blocks rendering, and throws an "Access Denied" page or redirects to the homepage.
*   **Action 3**: Log in using your seeded admin account (`admin@auralishotel.com`) and navigate to `http://localhost:3000/admin`.
*   **Expectation 3**: Access is granted; the administrative workspace renders.

#### Test Case 11.2: Shell Layout Navigation
*   **Action**: Navigate between the different links in the Admin Sidebar.
*   **Expectation**:
    *   The sidebar ([`Sidebar.jsx`](file:///c:/Ai%20powered%20hotel%20management%20system/auralis-hotel/src/components/admin/Sidebar.jsx)) correctly highlights the active link and navigates dynamically between: Dashboard (`/admin`), Bookings (`/admin/bookings`), Suite Inventory (`/admin/rooms`), Kitchen Menu (`/admin/food`), Customers (`/admin/customers`), and Reports (`/admin/reports`).
    *   The Admin Header ([`AdminHeader.jsx`](file:///c:/Ai%20powered%20hotel%20management%20system/auralis-hotel/src/components/admin/AdminHeader.jsx)) renders the current admin's email, a list of systemic toast alerts, and a functioning logout button.

---

## 5. Testing Step 12: Admin Control Dashboards

Step 12 builds dashboards for managing operations, updates, reservations, and inventory.

### 🧪 Verification Steps

#### Test Case 12.1: Command Console Landing (`/admin`)
*   **Action**: Navigate to `http://localhost:3000/admin`.
*   **Expectation**:
    *   Four custom widgets ([`StatsCard.jsx`](file:///c:/Ai%20powered%20hotel%20management%20system/auralis-hotel/src/components/admin/StatsCard.jsx)) display active KPIs (Occupancy Rate, Gross Profit, Total Stays, Pending Room Service Tickets).
    *   Check-in schedules, active kitchen orders, and occupancy rosters display correctly in tables.

#### Test Case 12.2: Guest Stays & Operations Registry (`/admin/bookings`)
*   **Action**: Locate a guest booking (e.g. status: `CONFIRMED`). Test status changes by clicking the action buttons:
    *   **Check-In**: Changes booking status to `CHECKED_IN` and updates the associated room status to `OCCUPIED`.
    *   **Check-Out**: Changes booking status to `CHECKED_OUT` and marks the associated room as `AVAILABLE`.
    *   **Cancel**: Sets booking status to `CANCELLED` and marks the associated room as `AVAILABLE`.
*   **Expectation**:
    *   Database rows update in real time.
    *   Success notifications pop up via `react-hot-toast`.
    *   Row styles update dynamically (e.g., dimmed styling for checked-out listings).

#### Test Case 12.3: Suite Inventory Operations (`/admin/rooms`)
*   **Action 1 (Add Room)**: Click "Add New Room" inside `/admin/rooms`, input values, and click save.
*   **Expectation 1**: The new suite appears in the room cards. Navigate to the guest catalog (`/rooms`) to verify it is also visible there.
*   **Action 2 (Maintenance Mode)**: Locate a room and change its status dropdown to `MAINTENANCE`.
*   **Expectation 2**: The room appears offline in the admin console. In the guest view (`/rooms`), verify that the room card displays a "Maintenance" tag or is completely hidden from booking availability.

#### Test Case 12.4: Kitchen & Menu Manager (`/admin/food`)
*   **Action 1 (Dish Availability)**: Toggle "Available" off for a menu item (e.g. Classic Waffles).
*   **Expectation 1**: Go to the customer dining catalog (`/food`) and verify the item displays as "Sold Out" or is hidden.
*   **Action 2 (Order Status Updates)**: Locate a pending food order and update its status dropdown: `PENDING` ➔ `PREPARING` ➔ `DELIVERED`.
*   **Expectation 2**: Logging back into the customer profile dashboard (`/profile`) shows the order's status has updated to reflect the change.

#### Test Case 12.5: Interactive Analytical Reports (`/admin/reports`)
*   **Action**: Navigate to `http://localhost:3000/admin/reports`.
*   **Expectation**:
    *   Occupancy trends and revenue breakdowns are rendered dynamically using **Recharts**.
    *   Hovering over data nodes displays precise tooltips.

---

## 6. Testing Step 13: Admin Aggregation APIs

Step 13 implements backend engines to process hotel statistics and user permissions.

### 🧪 Verification Steps

#### Test Case 13.1: Reports Aggregator Endpoint (`/api/reports`)
*   **Action**: Make a `GET` request to `http://localhost:3000/api/reports`.
*   **Expectation**: Returns computed, multi-table aggregate statistics. Verify the JSON structure contains:
    ```json
    {
      "monthlyRevenue": [
        { "month": "Jan", "revenue": 12500 }
      ],
      "roomTypeOccupancy": [
        { "type": "SUITE", "percentage": 82.5 }
      ],
      "topSellingFood": [
        { "name": "Classic Waffles", "count": 142 }
      ],
      "kpiSummary": {
        "grossProfit": 52100,
        "occupancyPercent": 64.2,
        "activeStays": 18,
        "kitchenBacklog": 4
      }
    }
    ```

#### Test Case 13.2: Customer Accounts Directory (`/api/customers`)
*   **Action**: Make a `GET` request to `http://localhost:3000/api/customers`.
*   **Expectation**: Returns all registered customers alongside their computed transaction logs:
    ```json
    [
      {
        "id": "user_id_1",
        "name": "Jane Doe",
        "email": "jane@example.com",
        "role": "GUEST",
        "bookingsCount": 3,
        "totalSpending": 1450.00,
        "createdAt": "2026-05-01T12:00:00.000Z"
      }
    ]
    ```

#### Test Case 13.3: Account Details & Permissions (`/api/customers/[id]`)
*   **Test PUT (Promote User to Admin)**:
    *   **Method**: `PUT`
    *   **URL**: `http://localhost:3000/api/customers/CUSTOMER_ID`
    *   **JSON Body**:
        ```json
        {
          "role": "ADMIN"
        }
        ```
    *   **Expectation**: Returns the updated user object. The user is now permitted to bypass Admin Layout guards.
*   **Test DELETE (Account Removal)**:
    *   **Method**: `DELETE`
    *   **URL**: `http://localhost:3000/api/customers/CUSTOMER_ID`
    *   **Expectation**: Returns `200 OK` (with confirming payload) or `204 No Content`. The user account and their sessions are deleted from the database.

---

## 💡 Advanced Troubleshooting Tips

### 🔄 Resetting the Database Environment
If you want to clear out test values and reset the environment to default, execute:
```bash
npx prisma migrate reset --force
npx prisma db push
node prisma/seed.js
```

### 🔍 Prisma Studio
Prisma Studio provides a graphical interface to view, edit, or delete database records directly:
```bash
npx prisma studio
```
Navigate to `http://localhost:5555` to view, search, and edit database records. This is highly useful for manually changing a user's role to `ADMIN` or marking active stays as checked-out.

### 🌐 NextAuth Debug Mode
If you experience authentication errors or fail to sign in, activate debugging by modifying the setup in [**`auth.js`**](file:///c:/Ai%20powered%20hotel%20management%20system/auralis-hotel/src/lib/auth.js):
```javascript
export const authOptions = {
  // ... other configurations
  debug: process.env.NODE_ENV === 'development',
};
```
This logs authentication errors, callback processes, and JWT details directly into your server console.
