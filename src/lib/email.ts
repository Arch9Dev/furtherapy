import nodemailer from 'nodemailer';
import { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, ADMIN_EMAIL } from '$env/static/private';

function createTransport() {
	return nodemailer.createTransport({
		host: SMTP_HOST,
		port: Number(SMTP_PORT ?? 587),
		secure: Number(SMTP_PORT) === 465,
		auth: { user: SMTP_USER, pass: SMTP_PASS }
	});
}

export async function sendBookingConfirmation(booking: {
	name: string;
	email: string;
	dog_name: string;
	service: string;
	date: string;
	time: string;
}) {
	const transport = createTransport();
	const serviceLabel = booking.service === 'first_visit' ? 'First Visit (60 min)' : 'Return Visit (45 min)';
	const formattedDate = new Date(booking.date + 'T00:00:00').toLocaleDateString('en-NZ', {
		weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
	});
	const [h, m] = booking.time.split(':').map(Number);
	const ampm = h >= 12 ? 'pm' : 'am';
	const formattedTime = `${h % 12 || 12}:${m.toString().padStart(2, '0')}${ampm}`;

	await transport.sendMail({
		from: `"FurTherapy" <${SMTP_USER}>`,
		to: booking.email,
		subject: `✅ Booking Confirmed — ${formattedDate}`,
		html: `
			<div style="font-family: system-ui, sans-serif; max-width: 580px; margin: 0 auto; background: #1f1f1f; color: #fff; border-radius: 12px; overflow: hidden;">
				<div style="background: #f68b1f; padding: 2rem; text-align: center;">
					<h1 style="margin: 0; color: #fff; font-size: 1.6rem;">Booking Confirmed! 🐾</h1>
				</div>
				<div style="padding: 2rem;">
					<p style="font-size: 1.05rem; margin-bottom: 1.5rem;">Hi ${booking.name},</p>
					<p style="color: #ccc; margin-bottom: 1.5rem;">Great news — your massage appointment for <strong style="color:#fff;">${booking.dog_name}</strong> has been confirmed.</p>
					<div style="background: #2a2a2a; border-radius: 8px; padding: 1.25rem 1.5rem; margin-bottom: 1.5rem; border-left: 3px solid #f68b1f;">
						<table style="width:100%; border-collapse:collapse;">
							<tr><td style="color:#888; padding: 0.35rem 0; width:120px;">Service</td><td style="color:#fff; font-weight:600;">${serviceLabel}</td></tr>
							<tr><td style="color:#888; padding: 0.35rem 0;">Date</td><td style="color:#fff; font-weight:600;">${formattedDate}</td></tr>
							<tr><td style="color:#888; padding: 0.35rem 0;">Time</td><td style="color:#fff; font-weight:600;">${formattedTime}</td></tr>
						</table>
					</div>
					<p style="color: #ccc; font-size: 0.9rem;">If you need to reschedule or have any questions, reply to this email or call us at <a href="tel:02114411722" style="color:#f68b1f;">021 144 1722</a>.</p>
					<p style="color: #ccc; font-size: 0.9rem; margin-top: 1rem;">We look forward to seeing ${booking.dog_name}! 🐕</p>
					<p style="margin-top: 2rem; color: #888; font-size: 0.85rem;">— The FurTherapy team</p>
				</div>
			</div>
		`
	});
}

export async function sendBookingDeclined(booking: {
	name: string;
	email: string;
	dog_name: string;
	date: string;
	time: string;
}) {
	const transport = createTransport();
	const formattedDate = new Date(booking.date + 'T00:00:00').toLocaleDateString('en-NZ', {
		weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
	});

	await transport.sendMail({
		from: `"FurTherapy" <${SMTP_USER}>`,
		to: booking.email,
		subject: `FurTherapy — Booking Update for ${booking.dog_name}`,
		html: `
			<div style="font-family: system-ui, sans-serif; max-width: 580px; margin: 0 auto; background: #1f1f1f; color: #fff; border-radius: 12px; overflow: hidden;">
				<div style="background: #2a2a2a; padding: 2rem; text-align: center; border-top: 4px solid #f68b1f;">
					<h1 style="margin: 0; color: #fff; font-size: 1.6rem;">Booking Update</h1>
				</div>
				<div style="padding: 2rem;">
					<p style="font-size: 1.05rem; margin-bottom: 1.5rem;">Hi ${booking.name},</p>
					<p style="color: #ccc; margin-bottom: 1.5rem;">Unfortunately we're unable to accommodate the appointment for <strong style="color:#fff;">${booking.dog_name}</strong> on <strong style="color:#fff;">${formattedDate}</strong>.</p>
					<p style="color: #ccc;">Please <a href="mailto:fur.therapymassage@gmail.com" style="color:#f68b1f;">contact us</a> or visit our <a href="https://furtherapy.co.nz/booking" style="color:#f68b1f;">booking page</a> to choose a different time — we'd love to find a slot that works for you.</p>
					<p style="margin-top: 2rem; color: #888; font-size: 0.85rem;">— The FurTherapy team</p>
				</div>
			</div>
		`
	});
}

export async function notifyAdminNewContact(submission: {
	name: string;
	email: string;
	message: string;
}) {
	const transport = createTransport();
	await transport.sendMail({
		from: `"FurTherapy Website" <${SMTP_USER}>`,
		to: ADMIN_EMAIL,
		replyTo: submission.email,
		subject: `New contact message from ${submission.name}`,
		html: `
			<div style="font-family: system-ui, sans-serif; max-width: 580px; margin: 0 auto;">
				<h2 style="color: #f68b1f;">New Contact Submission</h2>
				<p><strong>From:</strong> ${submission.name} (${submission.email})</p>
				<hr style="border-color: #333; margin: 1rem 0;" />
				<p style="white-space: pre-wrap; color: #333;">${submission.message}</p>
				<hr style="border-color: #333; margin: 1rem 0;" />
				<p style="color: #888; font-size: 0.85rem;">Reply to this email to respond directly to ${submission.name}.</p>
			</div>
		`
	});
}

export async function notifyAdminNewBooking(booking: {
	name: string;
	dog_name: string;
	service: string;
	date: string;
	time: string;
	email: string | null;
	phone: string | null;
}) {
	const transport = createTransport();
	const serviceLabel = booking.service === 'first_visit' ? 'First Visit (60 min)' : 'Return Visit (45 min)';
	await transport.sendMail({
		from: `"FurTherapy Website" <${SMTP_USER}>`,
		to: ADMIN_EMAIL,
		subject: `New booking request - ${booking.name} (${booking.dog_name})`,
		html: `
			<div style="font-family: system-ui, sans-serif; max-width: 580px; margin: 0 auto;">
				<h2 style="color: #f68b1f;">New Booking Request</h2>
				<table style="border-collapse:collapse; width:100%;">
					<tr><td style="padding:0.4rem 0; color:#888; width:120px;">Customer</td><td><strong>${booking.name}</strong></td></tr>
					<tr><td style="padding:0.4rem 0; color:#888;">Dog</td><td>${booking.dog_name}</td></tr>
					<tr><td style="padding:0.4rem 0; color:#888;">Service</td><td>${serviceLabel}</td></tr>
					<tr><td style="padding:0.4rem 0; color:#888;">Date</td><td>${booking.date}</td></tr>
					<tr><td style="padding:0.4rem 0; color:#888;">Time</td><td>${booking.time}</td></tr>
					${booking.email ? `<tr><td style="padding:0.4rem 0; color:#888;">Email</td><td><a href="mailto:${booking.email}">${booking.email}</a></td></tr>` : ''}
					${booking.phone ? `<tr><td style="padding:0.4rem 0; color:#888;">Phone</td><td>${booking.phone}</td></tr>` : ''}
				</table>
				<p style="margin-top:1.5rem; color:#888; font-size:0.85rem;">Log in to the admin dashboard to approve or decline this booking.</p>
			</div>
		`
	});
}