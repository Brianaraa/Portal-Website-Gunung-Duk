import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix default icon issue with Vite bundler
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Default center: Gunung Duk, Sentolo, Kulon Progo
const DEFAULT_CENTER = [-7.881, 110.234];
const DEFAULT_ZOOM = 15;

/**
 * InteractiveMap — Leaflet-based interactive map displaying location markers.
 * Props:
 *   - markers: Array of { id, name, category, coordinates: [lat, lng], gmaps, description }
 *   - center: [lat, lng] array
 *   - zoom: number
 *   - height: CSS height string
 */
export default function InteractiveMap({
  markers = [],
  center = DEFAULT_CENTER,
  zoom = DEFAULT_ZOOM,
  height = '480px',
}) {
  const validMarkers = markers.filter(
    (m) => m && m.coordinates && Array.isArray(m.coordinates) && m.coordinates.length >= 2
  );

  const mapCenter = validMarkers.length > 0 ? validMarkers[0].coordinates : center;

  return (
    <div
      className="w-full rounded-[2rem] overflow-hidden border border-gray-100 shadow-sm relative z-0"
      style={{ height }}
    >
      <MapContainer
        center={mapCenter}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
        zoomControl={true}
        attributionControl={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {validMarkers.map((item, idx) => {
          const [lat, lng] = item.coordinates;
          const gmapsUrl = item.gmaps || `https://www.google.com/maps?q=${lat},${lng}`;

          return (
            <Marker key={item.id || idx} position={[lat, lng]}>
              <Popup>
                <div className="p-1 min-w-[190px]">
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-sunset-600 bg-sunset-50 px-2 py-0.5 rounded-md">
                      {item.category || item.type || 'Lokasi'}
                    </span>
                  </div>
                  <h4 className="font-bold text-gray-900 text-sm mb-1.5 leading-snug">{item.name}</h4>
                  {item.description && (
                    <p className="text-gray-500 text-xs line-clamp-2 mb-3 leading-relaxed">{item.description}</p>
                  )}
                  <a
                    href={gmapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 w-full justify-center px-3 py-2 bg-sunset-500 hover:bg-sunset-600 text-white text-xs font-bold rounded-xl transition-colors no-underline shadow-sm"
                  >
                    <span>Buka di Google Maps</span>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

      <style>{`
        .leaflet-container {
          font-family: 'Poppins', system-ui, sans-serif;
        }
        .leaflet-popup-content-wrapper {
          border-radius: 1.25rem !important;
          box-shadow: 0 12px 36px rgba(38,32,53,0.18) !important;
          padding: 4px !important;
        }
        .leaflet-popup-content {
          margin: 8px 12px !important;
        }
        .leaflet-control-zoom {
          border: none !important;
          box-shadow: 0 2px 12px rgba(0,0,0,0.1) !important;
        }
        .leaflet-control-zoom a {
          border-radius: 0.5rem !important;
          border: 1px solid #e5e7eb !important;
          background: white !important;
          color: #374151 !important;
          font-size: 16px !important;
          width: 32px !important;
          height: 32px !important;
          line-height: 32px !important;
        }
        .leaflet-control-zoom a:hover {
          background: #fd5e53 !important;
          color: white !important;
          border-color: #fd5e53 !important;
        }
      `}</style>
    </div>
  );
}
