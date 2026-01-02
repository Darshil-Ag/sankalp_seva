import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import styles from './AdminPanel.module.css'

const AdminPanel = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [donations, setDonations] = useState([])
  const [stats, setStats] = useState(null)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [search, setSearch] = useState('')
  const [causeFilter, setCauseFilter] = useState('all')
  const [token, setToken] = useState(localStorage.getItem('admin_token') || '')

  const causes = [
    'Gau Sewa (Cow Feeding)',
    'Ladli Ghar Ajmer – Monthly Support',
    'Child Education',
    'Healthcare Support',
    'Women Empowerment',
    'General Donation (Use where needed most)'
  ]

  // Check if already authenticated
  useEffect(() => {
    if (token) {
      setIsAuthenticated(true)
      fetchDonations()
      fetchStats()
    }
  }, [token])

  const getApiBaseUrl = () => {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001/api/verify-donation'
    return apiUrl.replace('/api/verify-donation', '')
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch(`${getApiBaseUrl()}/api/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      })

      const data = await response.json()

      if (data.success && data.token) {
        setToken(data.token)
        localStorage.setItem('admin_token', data.token)
        setIsAuthenticated(true)
        fetchDonations()
        fetchStats()
      } else {
        setError(data.message || 'Invalid password')
      }
    } catch (error) {
      console.error('Login error:', error)
      setError('Failed to connect to server. Please check your connection.')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    setToken('')
    localStorage.removeItem('admin_token')
    setIsAuthenticated(false)
    setDonations([])
    setStats(null)
    setPassword('')
    // Navigate to home if we're still on admin page
    if (location.pathname === '/admin') {
      navigate('/')
    }
  }

  // Auto logout when navigating away from admin page
  useEffect(() => {
    // Only logout if we're authenticated and navigating away from admin
    if (location.pathname !== '/admin' && isAuthenticated && token) {
      handleLogout()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])

  const fetchDonations = async () => {
    try {
      const url = new URL(`${getApiBaseUrl()}/api/admin/donations`)
      url.searchParams.append('page', page)
      url.searchParams.append('limit', '20')
      if (search) {
        url.searchParams.append('search', search)
      }
      if (causeFilter && causeFilter !== 'all') {
        url.searchParams.append('cause', causeFilter)
      }

      const response = await fetch(url.toString(), {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      const data = await response.json()

      if (data.success) {
        setDonations(data.donations || [])
        setTotalPages(data.pagination?.totalPages || 1)
      } else {
        if (data.message?.includes('Unauthorized')) {
          handleLogout()
          setError('Session expired. Please login again.')
        }
      }
    } catch (error) {
      console.error('Error fetching donations:', error)
      setError('Failed to fetch donations')
    }
  }

  const fetchStats = async () => {
    try {
      const response = await fetch(`${getApiBaseUrl()}/api/admin/stats`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      const data = await response.json()

      if (data.success) {
        setStats(data.stats)
      }
    } catch (error) {
      console.error('Error fetching stats:', error)
    }
  }

  useEffect(() => {
    if (isAuthenticated && token) {
      fetchDonations()
    }
  }, [page, search, causeFilter, isAuthenticated, token])

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const formatAmount = (amountInPaise) => {
    return `₹${(amountInPaise / 100).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  }

  if (!isAuthenticated) {
    return (
      <div className={styles.loginWrapper}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className={styles.loginCard}
        >
          <div className={styles.loginHeader}>
            <div className={styles.loginIcon}>
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </div>
            <h1 className={styles.loginTitle}>Admin Login</h1>
            <p className={styles.loginSubtitle}>Enter password to access the admin dashboard</p>
          </div>
          
          <form onSubmit={handleLogin} className={styles.loginForm}>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={styles.errorMessage}
              >
                {error}
              </motion.div>
            )}
            
            <div className={styles.inputGroup}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                required
                autoFocus
                className={styles.passwordInput}
              />
            </div>

            <button type="submit" disabled={loading} className={styles.loginButton}>
              {loading ? (
                <>
                  <span className={styles.spinner}></span>
                  Logging in...
                </>
              ) : (
                <>
                  <span>Login</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    )
  }

  return (
    <div className={styles.adminContainer}>
      <div className={styles.container}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={styles.adminHeader}
        >
          <div className={styles.headerContent}>
            <div className={styles.headerTitle}>
              <h1>Payment Dashboard</h1>
              <p className={styles.headerSubtitle}>Monitor and manage all donations</p>
            </div>
            <button onClick={handleLogout} className={styles.logoutButton}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" x2="9" y1="12" y2="12"></line>
              </svg>
              Logout
            </button>
          </div>
        </motion.div>

        {stats && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={styles.statsGrid}
          >
            <motion.div
              whileHover={{ y: -4 }}
              className={styles.statCard}
            >
              <div className={styles.statIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <div className={styles.statContent}>
                <h3>Total Donations</h3>
                <p className={styles.statValue}>{stats.totalDonations}</p>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -4 }}
              className={styles.statCard}
            >
              <div className={styles.statIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" x2="12" y1="2" y2="22"></line>
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                </svg>
              </div>
              <div className={styles.statContent}>
                <h3>Total Amount</h3>
                <p className={styles.statValue}>{formatAmount(stats.totalAmount)}</p>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -4 }}
              className={styles.statCard}
            >
              <div className={styles.statIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <div className={styles.statContent}>
                <h3>Verified</h3>
                <p className={styles.statValue}>{stats.verifiedDonations}</p>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -4 }}
              className={styles.statCard}
            >
              <div className={styles.statIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
              </div>
              <div className={styles.statContent}>
                <h3>Last 30 Days</h3>
                <p className={styles.statValue}>{formatAmount(stats.recentAmount)}</p>
                <p className={styles.statSubtext}>{stats.recentDonations} donations</p>
              </div>
            </motion.div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={styles.controls}
        >
          <div className={styles.filtersRow}>
            <div className={styles.searchBox}>
              <svg className={styles.searchIcon} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
              <input
                type="text"
                placeholder="Search by name, phone, or payment ID..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value)
                  setPage(1)
                }}
                className={styles.searchInput}
              />
            </div>
            <div className={styles.filterBox}>
              <svg className={styles.filterIcon} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
              </svg>
              <select
                value={causeFilter}
                onChange={(e) => {
                  setCauseFilter(e.target.value)
                  setPage(1)
                }}
                className={styles.filterSelect}
              >
                <option value="all">All Causes</option>
                {causes.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={styles.tableContainer}
        >
          <div className={styles.tableHeader}>
            <h2>Recent Donations</h2>
            <span className={styles.tableCount}>{donations.length} {donations.length === 1 ? 'donation' : 'donations'}</span>
          </div>
          
          <div className={styles.tableWrapper}>
            <table className={styles.donationsTable}>
              <thead>
                <tr>
                  <th>Date & Time</th>
                  <th>Donor Name</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Cause</th>
                  <th>Amount</th>
                  <th>Payment ID</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {donations.length === 0 ? (
                  <tr>
                    <td colSpan="8" className={styles.noData}>
                      <div className={styles.noDataContent}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="11" cy="11" r="8"></circle>
                          <path d="m21 21-4.35-4.35"></path>
                        </svg>
                        <p>{search ? 'No donations found matching your search' : 'No donations yet'}</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  donations.map((donation, index) => (
                    <motion.tr
                      key={donation.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={styles.tableRow}
                    >
                      <td className={styles.dateCell}>
                        <span className={styles.dateText}>{formatDate(donation.created_at)}</span>
                      </td>
                      <td className={styles.nameCell}>
                        <strong>{donation.donor_name}</strong>
                      </td>
                      <td className={styles.phoneCell}>{donation.donor_phone || '-'}</td>
                      <td className={styles.emailCell}>{donation.donor_email || '-'}</td>
                      <td className={styles.causeCell}>
                        <span className={styles.causeBadge}>{donation.cause || 'General'}</span>
                      </td>
                      <td className={styles.amount}>
                        <span className={styles.amountValue}>{formatAmount(donation.amount)}</span>
                      </td>
                      <td className={styles.paymentId}>{donation.razorpay_payment_id}</td>
                      <td>
                        <span className={donation.verified ? styles.verified : styles.pending}>
                          {donation.verified ? (
                            <>
                              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12"></polyline>
                              </svg>
                              Verified
                            </>
                          ) : (
                            <>
                              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10"></circle>
                                <polyline points="12 6 12 12 16 14"></polyline>
                              </svg>
                              Pending
                            </>
                          )}
                        </span>
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className={styles.pagination}>
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className={styles.pageButton}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
                Previous
              </button>
              <span className={styles.pageInfo}>
                Page <strong>{page}</strong> of <strong>{totalPages}</strong>
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className={styles.pageButton}
              >
                Next
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </div>
          )}
        </motion.div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={styles.errorBanner}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            {error}
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default AdminPanel

