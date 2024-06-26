import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import MapComponent from '@/app/_components/Map'; 


jest.mock('@react-google-maps/api', () => ({
  useJsApiLoader: jest.fn().mockReturnValue({ isLoaded: true }),
  GoogleMap: jest.fn(({ children }) => <div data-testid="google-map">{children}</div>),
}));


beforeAll(() => {
  global.google = {
    maps: {
      Map: jest.fn(),
      DirectionsService: jest.fn(),
      TravelMode: {
        WALKING: 'WALKING'
      },
      MapTypeId: {
        ROADMAP: 'roadmap',
        HYBRID: 'hybrid'
      },
      LatLngBounds: jest.fn(() => ({
        extend: jest.fn()
      })),
    }
  };
});

describe('MapComponent', () => {
  const startCoords = { lat: 40.785091, lng: -73.968285 };
  const endCoords = { lat: 40.758896, lng: -73.985130 };

  it('renders the map when loaded', () => {
    render(<MapComponent startCoords={startCoords} endCoords={endCoords} />);

    expect(screen.getByTestId('google-map')).toBeInTheDocument();
  });
});
