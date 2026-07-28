/* ==========================================================================
   Elysian Estates - Property Filter & Wishlist Engine
   ========================================================================== */

const PROPERTIES_DATA = [
  {
    id: 'prop-1',
    title: 'The Beverly Ridge Estate',
    location: 'Beverly Hills, CA',
    city: 'beverly-hills',
    address: '1048 Ridgeview Drive, Beverly Hills, CA 90210',
    price: 18500000,
    formattedPrice: '$18,500,000',
    type: 'villa',
    status: 'For Sale',
    bedrooms: 6,
    bathrooms: 8,
    garage: 4,
    sqft: 9800,
    featured: true,
    badge: 'Exclusive',
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80',
    description: 'An architectural masterpiece in prestigious Beverly Hills offering uninhibited panoramic city-to-ocean views, zero-edge infinity pool, screening room, and wine cellar.',
  },
  {
    id: 'prop-2',
    title: 'Oceanfront Modern Sanctuary',
    location: 'Malibu, CA',
    city: 'malibu',
    address: '22814 Pacific Coast Hwy, Malibu, CA 90265',
    price: 24900000,
    formattedPrice: '$24,900,000',
    type: 'waterfront',
    status: 'For Sale',
    bedrooms: 5,
    bathrooms: 6,
    garage: 3,
    sqft: 7400,
    featured: true,
    badge: 'Beachfront',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    description: 'Direct beachfront glass-and-steel architectural retreat. Fleetwood floor-to-ceiling glass doors open seamlessly to private ocean decks and direct beach access.',
  },
  {
    id: 'prop-3',
    title: 'Bel Air Contemporary Manor',
    location: 'Bel Air, CA',
    city: 'bel-air',
    address: '710 Nimes Road, Los Angeles, CA 90077',
    price: 32000000,
    formattedPrice: '$32,000,000',
    type: 'mansion',
    status: 'For Sale',
    bedrooms: 7,
    bathrooms: 10,
    garage: 6,
    sqft: 14200,
    featured: true,
    badge: 'Trophy Estate',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    description: 'Set behind double gates on 2 private acres. Features grand motor court, tennis court, wellness spa, subterranean 8-car garage, and two-story master suite.',
  },
  {
    id: 'prop-4',
    title: 'Park Avenue Luxury Penthouse',
    location: 'New York, NY',
    city: 'new-york',
    address: '432 Park Avenue, Penthouse 88, New York, NY 10022',
    price: 29500000,
    formattedPrice: '$29,500,000',
    type: 'penthouse',
    status: 'For Sale',
    bedrooms: 4,
    bathrooms: 5,
    garage: 1,
    sqft: 6200,
    featured: false,
    badge: 'Penthouse',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
    description: 'Crown jewel full-floor residence overlooking Central Park. 12.5-foot ceilings, custom white oak floors, master bath clad in Statuario marble.',
  },
  {
    id: 'prop-5',
    title: 'Aspen Mountain Alpine Villa',
    location: 'Aspen, CO',
    city: 'aspen',
    address: '520 Red Mountain Road, Aspen, CO 81611',
    price: 21000000,
    formattedPrice: '$21,000,000',
    type: 'chalet',
    status: 'For Sale',
    bedrooms: 6,
    bathrooms: 7,
    garage: 3,
    sqft: 8900,
    featured: false,
    badge: 'Ski-In/Ski-Out',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
    description: 'Ultra-luxurious ski lodge boasting timber trusses, floor-to-ceiling mountain view windows, heated infinity spa, and custom ski prep lounge.',
  },
  {
    id: 'prop-6',
    title: 'Star Island Waterfront Haven',
    location: 'Miami Beach, FL',
    city: 'miami',
    address: '32 Star Island Drive, Miami Beach, FL 33139',
    price: 38500000,
    formattedPrice: '$38,500,000',
    type: 'waterfront',
    status: 'For Sale',
    bedrooms: 8,
    bathrooms: 9,
    garage: 4,
    sqft: 11500,
    featured: true,
    badge: 'Private Dock',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    description: 'Private gated Star Island estate with 100ft of deepwater yacht dockage, tropical resort pool, summer kitchen, and private guest villa.',
  }
];

class PropertyFilterEngine {
  constructor() {
    this.properties = PROPERTIES_DATA;
    this.wishlist = JSON.parse(localStorage.getItem('elysian_wishlist') || '[]');
    this.init();
  }

  init() {
    document.addEventListener('DOMContentLoaded', () => {
      this.bindSearchForms();
      this.renderProperties();
      this.bindWishlistButtons();
    });
  }

  getFavorites() {
    return this.wishlist;
  }

  toggleWishlist(id) {
    if (this.wishlist.includes(id)) {
      this.wishlist = this.wishlist.filter(itemId => itemId !== id);
    } else {
      this.wishlist.push(id);
    }
    localStorage.setItem('elysian_wishlist', JSON.stringify(this.wishlist));
    this.updateWishlistUI(id);
  }

  updateWishlistUI(id) {
    const isFav = this.wishlist.includes(id);
    document.querySelectorAll(`.favorite-btn[data-id="${id}"]`).forEach(btn => {
      btn.classList.toggle('active', isFav);
      btn.setAttribute('aria-label', isFav ? 'Remove from favorites' : 'Add to favorites');
    });
  }

  bindWishlistButtons() {
    document.addEventListener('click', (e) => {
      const favBtn = e.target.closest('.favorite-btn');
      if (favBtn) {
        e.preventDefault();
        e.stopPropagation();
        const id = favBtn.dataset.id;
        this.toggleWishlist(id);
      }
    });
  }

  bindSearchForms() {
    const filterForms = document.querySelectorAll('.property-search-form');
    filterForms.forEach(form => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const params = new URLSearchParams();

        for (const [key, value] of formData.entries()) {
          if (value) params.append(key, value);
        }

        // If on home page, redirect to properties.html with params
        if (!window.location.pathname.includes('properties.html')) {
          window.location.href = `properties.html?${params.toString()}`;
        } else {
          this.applyFilterFromParams(params);
        }
      });
    });

    // Auto load filter params if on properties page
    if (window.location.pathname.includes('properties.html')) {
      const urlParams = new URLSearchParams(window.location.search);
      this.applyFilterFromParams(urlParams);
    }
  }

  applyFilterFromParams(params) {
    const location = params.get('location') || '';
    const type = params.get('type') || '';
    const minPrice = parseInt(params.get('minPrice') || '0', 10);
    const maxPrice = parseInt(params.get('maxPrice') || '999999999', 10);
    const bedrooms = parseInt(params.get('bedrooms') || '0', 10);

    const filtered = this.properties.filter(item => {
      if (location && item.city !== location && !item.location.toLowerCase().includes(location.toLowerCase())) return false;
      if (type && item.type !== type) return false;
      if (item.price < minPrice || item.price > maxPrice) return false;
      if (bedrooms && item.bedrooms < bedrooms) return false;
      return true;
    });

    this.renderPropertyListings(filtered);
  }

  renderProperties() {
    // Render Featured Properties on Homepage if container exists
    const featuredContainer = document.querySelector('#featured-properties-grid');
    if (featuredContainer) {
      const featuredList = this.properties.filter(p => p.featured);
      featuredContainer.innerHTML = featuredList.map(item => this.createCardHTML(item)).join('');
    }

    // Render All Properties on Properties Page if container exists
    const mainListContainer = document.querySelector('#properties-list-grid');
    if (mainListContainer && !window.location.search) {
      this.renderPropertyListings(this.properties);
    }
  }

  renderPropertyListings(list) {
    const container = document.querySelector('#properties-list-grid');
    const countEl = document.querySelector('#properties-count');

    if (countEl) {
      countEl.textContent = `${list.length} Luxuries Available`;
    }

    if (container) {
      if (list.length === 0) {
        container.innerHTML = `
          <div class="text-center py-12 col-span-full">
            <h3 class="font-heading text-2xl text-heading mb-2">No Matching Estates Found</h3>
            <p class="text-body text-sm mb-6">Try adjusting your filters or search criteria.</p>
            <button onclick="window.location.href='properties.html'" class="btn btn-outline">Reset All Filters</button>
          </div>
        `;
      } else {
        container.innerHTML = list.map(item => this.createCardHTML(item)).join('');
      }
    }
  }

  createCardHTML(item) {
    const isFav = this.wishlist.includes(item.id);
    return `
      <article class="property-card hover-lift">
        <div class="property-card-img-wrapper">
          <img src="${item.image}" alt="${item.title}" class="property-card-img" loading="lazy" />
          <div class="property-badges">
            <span class="badge badge-gold">${item.status}</span>
            <span class="badge badge-glass">${item.badge}</span>
          </div>
          <button class="favorite-btn ${isFav ? 'active' : ''}" data-id="${item.id}" aria-label="Add to favorites">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="${isFav ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
          </button>
          <div class="property-price-tag">${item.formattedPrice}</div>
        </div>
        <div class="property-card-content">
          <span class="property-location">${item.location}</span>
          <h3 class="property-title">${item.title}</h3>
          <p class="property-address">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
            ${item.address}
          </p>
          <div class="property-specs">
            <div class="spec-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 4v16"/><path d="M2 8h18a2 2 0 0 1 2 2v10"/><path d="M2 17h20"/><path d="M6 8v9"/></svg>
              ${item.bedrooms} Beds
            </div>
            <div class="spec-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-2.12 0 1.5 1.5 0 0 0 0 2.12L7 8"/><path d="M12 9 9.5 6.5a1.5 1.5 0 0 0-2.12 0 1.5 1.5 0 0 0 0 2.12L10 11"/><path d="M14 16h6a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h6"/></svg>
              ${item.bathrooms} Baths
            </div>
            <div class="spec-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>
              ${item.sqft.toLocaleString()} SqFt
            </div>
          </div>
          <a href="property-details.html?id=${item.id}" class="btn btn-outline btn-sm w-full" style="margin-top: 1rem;">View Details</a>
        </div>
      </article>
    `;
  }
}

const windowFilterEngine = new PropertyFilterEngine();
