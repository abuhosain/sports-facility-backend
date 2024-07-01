import { IBooking } from './booking.interface';

export const calculateAmount = (
  pricePerHour: number,
  payload: IBooking,
) => {
  const startTime =
    Number(payload?.startTime.split(':')[0]) +
    (Number(payload?.startTime.split(':')[1]) * 1) / 60;

  const endTime =
    Number(payload?.endTime.split(':')[0]) +
    (Number(payload?.endTime.split(':')[1]) * 1) / 60;

  const bookingDuarationTime = endTime - startTime;
  const calculatePayableAmount = bookingDuarationTime * Number(pricePerHour);

  return calculatePayableAmount;
};