import { Modal } from '~/components/ui/modal'
import { useUI } from '~/context/ui-context'

const sizeChart = [
  { size: 'XS', chest: '34-36"', waist: '26-28"', hip: '34-36"' },
  { size: 'S', chest: '36-38"', waist: '28-30"', hip: '36-38"' },
  { size: 'M', chest: '38-40"', waist: '30-32"', hip: '38-40"' },
  { size: 'L', chest: '40-42"', waist: '32-34"', hip: '40-42"' },
  { size: 'XL', chest: '42-44"', waist: '34-36"', hip: '42-44"' },
  { size: 'XXL', chest: '44-46"', waist: '36-38"', hip: '44-46"' },
]

export function SizeGuideModal() {
  const { isSizeGuideOpen, closeSizeGuide } = useUI()

  return (
    <Modal isOpen={isSizeGuideOpen} onClose={closeSizeGuide}>
      <div className="p-6 md:p-8">
        <h2 className="font-heading text-xl font-bold text-smoke mb-6">Size Guide</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-smoke/10">
                <th className="text-left py-3 pr-4 text-smoke-muted font-medium">Size</th>
                <th className="text-left py-3 px-4 text-smoke-muted font-medium">Chest</th>
                <th className="text-left py-3 px-4 text-smoke-muted font-medium">Waist</th>
                <th className="text-left py-3 pl-4 text-smoke-muted font-medium">Hip</th>
              </tr>
            </thead>
            <tbody>
              {sizeChart.map((row) => (
                <tr key={row.size} className="border-b border-smoke/5">
                  <td className="py-3 pr-4 font-medium text-smoke">{row.size}</td>
                  <td className="py-3 px-4 text-smoke-muted">{row.chest}</td>
                  <td className="py-3 px-4 text-smoke-muted">{row.waist}</td>
                  <td className="py-3 pl-4 text-smoke-muted">{row.hip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 p-4 bg-void border border-smoke/5">
          <p className="text-xs text-smoke-muted">
            <span className="text-smoke font-medium">Tip:</span> Our hoodies and tees are designed with an oversized fit. If you prefer a more fitted look, we recommend sizing down.
          </p>
        </div>
      </div>
    </Modal>
  )
}
