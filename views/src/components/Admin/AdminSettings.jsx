// AdminSettings.jsx
import React from "react";

const AdminSettings = () => {
  return (
    <div>
      <h3>Settings</h3>
      <form>
        <input type="text" placeholder="Change Site Name" />
        <input type="file" />
        <button>Save Changes</button>
      </form>
    </div>
  );
};

export default AdminSettings;
