import MapSearchComponent from './../components/MapSearchComponent';
import DataList from './../components/DataList';
import {useState, useEffect} from React;

export default function HotelList() {
    const [hotelsData,setHotelsData] = useState<Array<any>>([]);

    return <>
        <MapSearchComponent />
        {hotelsData && hotelsData.length ? <DataList dataList={hotelsData}/> : 'Nessun hotelda visualizzare'}
    </>
};