'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { User, Phone, Mail, CheckCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// ─── Validation Schema ────────────────────────────────────────────────────────
const leadSchema = z.object({
  firstName: z
    .string()
    .min(2, 'Please enter your first name')
    .max(50, 'Name is too long'),
  phone: z
    .string()
    .min(7, 'Please enter a valid phone number')
    .regex(/^[\d\s\-\(\)\+]+$/, 'Please enter a valid phone number'),
  email: z
    .string()
    .email('Please enter a valid email address'),
});

type LeadFormData = z.infer<typeof leadSchema>;
type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error';

// ─── Field Component ──────────────────────────────────────────────────────────
function FormField({
  id,
  placeholder,
  type = 'text',
  icon: Icon,
  error,
  ...rest
}: {
  id: string;
  placeholder: string;
  type?: string;
  icon: React.ElementType;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="relative">
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className={cn(
          'w-full h-[52px] pl-4 pr-11 rounded-md font-sans text-sm',
          'bg-white/80 text-body placeholder:text-body/50',
          'border transition-all duration-200',
          'focus:outline-none focus:ring-2 focus:ring-gold/60 focus:bg-white',
          error
            ? 'border-red-400'
            : 'border-white/60 hover:border-white'
        )}
        {...rest}
      />
      <Icon
        size={16}
        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gold/70 pointer-events-none"
      />
      {error && (
        <p className="mt-1 text-xs text-red-300 font-sans">{error}</p>
      )}
    </div>
  );
}

// ─── Lead Form ────────────────────────────────────────────────────────────────
export function LeadForm() {
  const [status, setStatus] = useState<SubmitStatus>('idle');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema),
  });

  const onSubmit = async (data: LeadFormData) => {
    setStatus('submitting');
    try {
      // TODO: Replace with your server action or API route
      // e.g. await fetch('/api/leads', { method: 'POST', body: JSON.stringify(data) })
      await new Promise((res) => setTimeout(res, 1200)); // Simulated delay
      console.log('Lead submitted:', data);
      setStatus('success');
      reset();
    } catch {
      setStatus('error');
    }
  };

  return (
    // Glass card
    <div
      id="lead-form"
      className={cn(
        'relative w-full max-w-[400px] rounded-2xl overflow-hidden',
        'bg-white/10 backdrop-blur-md',
        'border border-white/30',
        'p-7 md:p-8',
        'shadow-[0_8px_40px_rgba(0,0,0,0.35)]'
      )}
    >
      {/* Success State */}
      {status === 'success' ? (
        <div className="flex flex-col items-center justify-center text-center py-8 gap-4">
          <CheckCircle size={48} className="text-gold" />
          <h3 className="font-display text-white text-2xl font-semibold">
            Thank You!
          </h3>
          <p className="font-sans text-white/80 text-sm leading-relaxed">
            We've received your request and will be in touch within 24 hours.
          </p>
          <button
            onClick={() => setStatus('idle')}
            className="text-gold text-sm font-sans underline underline-offset-4 hover:text-gold-light transition-colors duration-200"
          >
            Submit another request
          </button>
        </div>
      ) : (
        <>
          {/* Heading */}
          <div className="text-center mb-5">
            <h2 className="font-display text-white text-xl md:text-2xl font-semibold leading-snug">
              Get A 20% Discount On Your Home Remodeling!
            </h2>
            <p className="font-sans text-gold text-sm mt-2">
              *Starting from $10,000
            </p>
          </div>

          {/* Fields */}
          <div
            className="flex flex-col gap-3"
            // No <form> tag — React Hook Form handles submit via div + handleSubmit
          >
            <FormField
              id="firstName"
              placeholder="First Name"
              icon={User}
              error={errors.firstName?.message}
              {...register('firstName')}
            />
            <FormField
              id="phone"
              placeholder="Phone Number"
              type="tel"
              icon={Phone}
              error={errors.phone?.message}
              {...register('phone')}
            />
            <FormField
              id="email"
              placeholder="Email Address"
              type="email"
              icon={Mail}
              error={errors.email?.message}
              {...register('email')}
            />

            {status === 'error' && (
              <p className="text-red-300 text-xs font-sans text-center">
                Something went wrong. Please try again.
              </p>
            )}

            <button
              onClick={handleSubmit(onSubmit)}
              disabled={status === 'submitting'}
              className={cn(
                'w-full h-[52px] mt-1 rounded-md',
                'font-sans font-medium text-sm uppercase tracking-widest',
                'bg-gold text-white border border-gold',
                'hover:bg-gold-dark hover:border-gold-dark',
                'active:scale-[0.98]',
                'transition-all duration-200',
                'flex items-center justify-center gap-2',
                status === 'submitting' && 'opacity-70 cursor-not-allowed'
              )}
            >
              {status === 'submitting' ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Sending...
                </>
              ) : (
                'Send'
              )}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
