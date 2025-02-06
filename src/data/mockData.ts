export const mockData = {
  userManagement: {
    total_users: 12458,
    verified_users: 10892,
    active_users: 8234
  },
  deviceManagement: {
    active_devices: 3890,
    device_usage_trends: "23% increase this month",
    device_locations: [
      {
        device_id: "DEV-123",
        location: {
          city: "San Francisco",
          state: "CA"
        },
        status: "Active",
        last_active: "2024-03-15T14:30:00Z"
      },
      {
        device_id: "DEV-456",
        location: {
          city: "New York",
          state: "NY"
        },
        status: "Inactive",
        last_active: "2024-03-14T09:15:00Z"
      },
      {
        device_id: "DEV-789",
        location: {
          city: "Austin",
          state: "TX"
        },
        status: "Active",
        last_active: "2024-03-15T16:45:00Z"
      }
    ]
  },
  applicationServices: {
    total_applications: 156,
    active_applications: 142
  },
  userPayout: {
    total_payouts: 458900,
    pending_payouts: 23400
  },
  recentActivity: [
    {
      id: 1,
      user: "John Doe",
      action: "deployed a new cluster",
      timestamp: "2024-03-15T16:45:00Z"
    },
    {
      id: 2,
      user: "Jane Smith",
      action: "updated device settings",
      timestamp: "2024-03-15T15:30:00Z"
    },
    {
      id: 3,
      user: "Mike Johnson",
      action: "processed payout",
      timestamp: "2024-03-15T14:15:00Z"
    },
    {
      id: 4,
      user: "Sarah Wilson",
      action: "added new device",
      timestamp: "2024-03-15T13:00:00Z"
    }
  ]
};