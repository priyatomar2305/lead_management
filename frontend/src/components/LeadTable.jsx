export default function LeadTable({ leads }) {
  return (
    <div className="bg-white rounded-lg shadow p-6 mt-8 overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4">Recent Leads</h2>

      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Phone</th>
            <th className="p-3 text-left">Company</th>
          </tr>
        </thead>

        <tbody>
          {leads.map((lead) => (
            <tr key={lead._id} className="border-b">
              <td className="p-3">{lead.name}</td>
              <td className="p-3">{lead.email}</td>
              <td className="p-3">{lead.phone}</td>
              <td className="p-3">{lead.company}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
