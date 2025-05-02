export default function UserProfile({
	email,
	phone,
	city,
	address,
	birthDate,
	personal_id,
	wantsCard,
	buttonname,
}) {
	return (
		<>
			<div className="box grid-2">
				<fieldset className="box fieldset">
					<label htmlFor="email">ელ.ფოსტა</label>
					<input
						required
						type="email"
						id="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</fieldset>
				<fieldset className="fieldset">
					<label htmlFor="phone" className="mainfont">
						ტელეფონი
					</label>
					<input
						required
						type="text"
						id="phone"
						value={phone}
						onChange={(e) => setPhone(e.target.value)}
					/>
				</fieldset>
			</div>
			<fieldset className="box fieldset">
				<label htmlFor="city" className="mainfont">
					ქალაქი
				</label>
				<div className="select-custom">
					<select
						required
						className="tf-select w-100 mainfont"
						id="city"
						value={city}
						onChange={(e) => setCity(e.target.value)}
					>
						<option value=""></option>
						<option value="აბაშა">აბაშა</option>
						<option value="ასპინძა">ასპინძა</option>
						<option value="ახალციხე">ახალციხე</option>
						<option value="ახმეტა">ახმეტა</option>
						<option value="ბათუმი">ბათუმი</option>
						<option value="ბორჯომი">ბორჯომი</option>
						<option value="გარდაბანი">გარდაბანი</option>
						<option value="გორი">გორი</option>
						<option value="გურჯაანი">გურჯაანი</option>
						<option value="დუშეთი">დუშეთი</option>
						<option value="ვაზიანი">ვაზიანი</option>
						<option value="ვანი">ვანი</option>
						<option value="ზესტაფონი">ზესტაფონი</option>
						<option value="ზუგდიდი">ზუგდიდი</option>
						<option value="თბილისი">თბილისი</option>
						<option value="თელავი">თელავი</option>
						<option value="თერჯოლა">თერჯოლა</option>
						<option value="კოჯორი">კოჯორი</option>
						<option value="ლაგოდეხი">ლაგოდეხი</option>
						<option value="მარნეული">მარნეული</option>
						<option value="მცხეთა">მცხეთა</option>
						<option value="ოზურგეთი">ოზურგეთი</option>
						<option value="ოქროყანა">ოქროყანა</option>
						<option value="რუსთავი">რუსთავი</option>
						<option value="სამტრედია">სამტრედია</option>
						<option value="სიღნაღი">სიღნაღი</option>
						<option value="ტაბახმელა">ტაბახმელა</option>
						<option value="ტყიბული">ტყიბული</option>
						<option value="ფოთი">ფოთი</option>
						<option value="ქობულეთი">ქობულეთი</option>
						<option value="ქუთაისი">ქუთაისი</option>
						<option value="შინდისი">შინდისი</option>
						<option value="ჩოხატაური">ჩოხატაური</option>
						<option value="წავკისი">წავკისი</option>
						<option value="წყალტუბო">წყალტუბო</option>
						<option value="წყნეთი">წყნეთი</option>
						<option value="ჭიათურა">ჭიათურა</option>
						<option value="ხარაგაული">ხარაგაული</option>
						<option value="ხაშური">ხაშური</option>
						<option value="ხონი">ხონი</option>
					</select>
				</div>
			</fieldset>
			<fieldset className="box fieldset">
				<label htmlFor="address" className="mainfont">
					მისამართი
				</label>
				<input
					required
					type="text"
					id="address"
					value={address}
					onChange={(e) => setAddress(e.target.value)}
				/>
			</fieldset>
			<fieldset className="box fieldset">
				<label htmlFor="birth_date" className="mainfont">
					დაბადების თარიღი
				</label>
				<input
					required
					type="date"
					id="birth_date"
					value={birthDate}
					onChange={(e) => setBirthDate(e.target.value)}
				/>
			</fieldset>
			<fieldset className="box fieldset">
				<label htmlFor="personal_id" className="mainfont">
					პირადი ნომერი
				</label>
				<input
					required
					type="text"
					id="personal_id"
					value={personal_id}
					onChange={(e) => setpersonal_id(e.target.value)}
				/>
			</fieldset>
			<fieldset className="box fieldset">
				<label htmlFor="card" className="mainfont">
					გსურთ ბარათის მიღება?
				</label>
				<div className="select-custom">
					<select
						required
						className="tf-select w-100 mainfont"
						id="card"
						value={wantsCard}
						onChange={(e) => setWantsCard(e.target.value)}
					>
						<option value="0">არა</option>
						<option value="1">დიახ</option>
					</select>
				</div>
			</fieldset>
			<button className="tf-btn radius-3 btn-fill btn-icon animate-hover-btn justify-content-center mainfont">
				{buttonname}
			</button>{" "}
		</>
	);
}
