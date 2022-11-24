export interface lots {}

export function IndivLTA(props: any) {
  return (
    <>
      <h4>Location</h4>
      <div>Coordinates: {props.lots.Location}</div>
      <div>Area: {props.lots.Development}</div>
      <div>Lot available: {props.lots.AvailableLots}</div>
      <div>Lot Type: {props.lots.LotType}</div>
      <div>CarparkID: {props.lots.CarParkID}</div>
      <br />
    </>
  );
}
